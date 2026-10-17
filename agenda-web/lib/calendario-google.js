// Google Calendar por API REST con un token de actualización (refresh token) de la cuenta del despacho.
import { config } from './config.js';

const API = 'https://www.googleapis.com/calendar/v3';
const calId = () => encodeURIComponent(process.env.GOOGLE_CALENDAR_ID || 'primary');
let cache = { token: null, vence: 0 };

async function token() {
  if (cache.token && Date.now() < cache.vence - 60000) return cache.token;
  const r = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID || '',
      client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN || '',
      grant_type: 'refresh_token',
    }),
  });
  if (!r.ok) throw new Error(`Google OAuth rechazó la autorización (${r.status})`);
  const j = await r.json();
  cache = { token: j.access_token, vence: Date.now() + j.expires_in * 1000 };
  return cache.token;
}

async function g(ruta, opciones = {}) {
  const r = await fetch(`${API}${ruta}`, {
    ...opciones,
    headers: { authorization: `Bearer ${await token()}`, 'content-type': 'application/json' },
  });
  if (r.status === 404) return null;
  if (!r.ok) throw new Error(`Google Calendar respondió ${r.status}: ${(await r.text()).slice(0, 200)}`);
  return r.status === 204 ? {} : r.json();
}

// Libera los cupos retenidos cuyo pago nunca llegó.
async function liberarVencidas() {
  const lista = await g(`/calendars/${calId()}/events?privateExtendedProperty=${encodeURIComponent('jac_estado=pendiente')}&maxResults=100`);
  const limite = Date.now() - config.retencionMin * 60000;
  for (const e of lista?.items || []) {
    if (new Date(e.created).getTime() < limite) {
      await g(`/calendars/${calId()}/events/${e.id}?sendUpdates=none`, { method: 'DELETE' });
    }
  }
}

export async function ocupados(desde, hasta) {
  await liberarVencidas();
  const j = await g('/freeBusy', {
    method: 'POST',
    body: JSON.stringify({ timeMin: desde, timeMax: hasta, timeZone: 'America/Bogota', items: [{ id: process.env.GOOGLE_CALENDAR_ID || 'primary' }] }),
  });
  const cal = Object.values(j.calendars || {})[0];
  return (cal?.busy || []).map((b) => ({ inicio: b.start, fin: b.end }));
}

export async function crearReserva({ id, inicio, fin, datos, monto }) {
  await g(`/calendars/${calId()}/events?sendUpdates=none`, {
    method: 'POST',
    body: JSON.stringify({
      id,
      status: 'tentative',
      summary: `PENDIENTE DE PAGO - ${datos.nombre}`,
      start: { dateTime: inicio, timeZone: 'America/Bogota' },
      end: { dateTime: fin, timeZone: 'America/Bogota' },
      extendedProperties: { private: { jac_estado: 'pendiente', jac_email: datos.email, jac_monto: String(monto) } },
      description: descripcion(datos),
    }),
  });
  return { id };
}

const descripcion = (d) => `Cliente: ${d.nombre}\nCorreo: ${d.email}\nCelular: ${d.telefono}\nTema: ${d.tema}`;

function normalizar(e) {
  return {
    id: e.id,
    inicio: e.start.dateTime,
    fin: e.end.dateTime,
    estado: e.extendedProperties?.private?.jac_estado === 'confirmada' ? 'confirmada' : 'pendiente',
    monto: Number(e.extendedProperties?.private?.jac_monto),
    meetUrl: e.hangoutLink || null,
  };
}

export async function obtenerReserva(id) {
  const e = await g(`/calendars/${calId()}/events/${id}`);
  return e && e.status !== 'cancelled' ? normalizar(e) : null;
}

export async function confirmarReserva(id) {
  const actual = await g(`/calendars/${calId()}/events/${id}`);
  if (actual.extendedProperties?.private?.jac_estado === 'confirmada') return { meetUrl: actual.hangoutLink || null };
  const nombre = actual.summary.replace('PENDIENTE DE PAGO - ', '');
  const email = actual.extendedProperties.private.jac_email;
  let e = await g(`/calendars/${calId()}/events/${id}?conferenceDataVersion=1&sendUpdates=all`, {
    method: 'PATCH',
    body: JSON.stringify({
      status: 'confirmed',
      summary: `${config.consulta.nombre} - ${nombre}`,
      attendees: [{ email }],
      extendedProperties: { private: { jac_estado: 'confirmada', jac_email: email, jac_monto: actual.extendedProperties.private.jac_monto } },
      conferenceData: { createRequest: { requestId: id, conferenceSolutionKey: { type: 'hangoutsMeet' } } },
      reminders: { useDefault: false, overrides: [{ method: 'email', minutes: 1440 }, { method: 'popup', minutes: 30 }] },
    }),
  });
  if (!e.hangoutLink) { // Meet a veces se crea unos segundos después
    await new Promise((ok) => setTimeout(ok, 1500));
    e = await g(`/calendars/${calId()}/events/${id}`);
  }
  return { meetUrl: e.hangoutLink || null };
}
