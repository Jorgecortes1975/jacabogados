// Se ejecuta UNA vez en su computador: inicia sesión en Google y entrega el GOOGLE_REFRESH_TOKEN.
// Uso: npm run google-token   (con GOOGLE_CLIENT_ID y GOOGLE_CLIENT_SECRET en su .env)
import { createServer } from 'node:http';
import { randomBytes } from 'node:crypto';

const { GOOGLE_CLIENT_ID: id, GOOGLE_CLIENT_SECRET: secreto } = process.env;
if (!id || !secreto) {
  console.error('Falta GOOGLE_CLIENT_ID o GOOGLE_CLIENT_SECRET en su archivo .env. Vea docs/guia-puesta-en-marcha.md.');
  process.exit(1);
}

const PUERTO = Number(process.env.PUERTO_TOKEN) || 8765;
const retorno = `http://localhost:${PUERTO}`;
const estado = randomBytes(16).toString('hex');
// Mínimo necesario: crear citas con Meet y consultar horas ocupadas. (Alcances sin verificar con la documentación.)
const alcances = ['https://www.googleapis.com/auth/calendar.events', 'https://www.googleapis.com/auth/calendar.freebusy'];

const pagina = (titulo, texto) => `<!doctype html><meta charset="utf-8"><title>${titulo}</title><body style="font:18px system-ui;max-width:32em;margin:3em auto;padding:0 1em"><h1>${titulo}</h1><p>${texto}</p>`;

const servidor = createServer(async (req, res) => {
  const url = new URL(req.url, retorno);
  if (url.pathname !== '/') return res.writeHead(404).end();
  const responder = (codigo, titulo, texto) => res.writeHead(codigo, { 'content-type': 'text/html; charset=utf-8' }).end(pagina(titulo, texto));

  if (url.searchParams.get('state') !== estado) return responder(400, 'Solicitud no válida', 'Vuelva a ejecutar el comando en la terminal.');
  if (url.searchParams.get('error')) {
    responder(400, 'No se autorizó', 'Puede cerrar esta ventana y volver a intentarlo.');
    console.error(`Google respondió: ${url.searchParams.get('error')}`);
    return terminar(1);
  }
  const r = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ code: url.searchParams.get('code') || '', client_id: id, client_secret: secreto, redirect_uri: retorno, grant_type: 'authorization_code' }),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || !j.refresh_token) {
    responder(500, 'No se pudo obtener el permiso', 'Revise la terminal.');
    console.error(`Google no entregó el token (${r.status}: ${j.error || 'sin refresh_token'}). Si ya había autorizado antes, quite el acceso de esta aplicación en su cuenta de Google y repita.`);
    return terminar(1);
  }
  responder(200, 'Listo', 'Ya puede cerrar esta ventana y volver a la terminal.');
  console.log('\nCopie esta línea en su archivo .env (o en las variables de entorno de Vercel). No la comparta con nadie:\n');
  console.log(`GOOGLE_REFRESH_TOKEN=${j.refresh_token}\n`);
  terminar(0);
});

function terminar(codigo) { servidor.close(); setTimeout(() => process.exit(codigo), 200); }

servidor.listen(PUERTO, () => {
  const auth = 'https://accounts.google.com/o/oauth2/v2/auth?' + new URLSearchParams({
    client_id: id, redirect_uri: retorno, response_type: 'code', scope: alcances.join(' '),
    access_type: 'offline', prompt: 'consent', state: estado,
  });
  console.log('Abra esta dirección en su navegador e inicie sesión con la cuenta del despacho:\n');
  console.log(auth + '\n');
  console.log('Esperando la autorización (5 minutos)...');
  setTimeout(() => { console.error('Se agotó el tiempo. Vuelva a ejecutar el comando.'); terminar(1); }, 5 * 60000).unref();
});
