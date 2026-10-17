const TZ = 'America/Bogota';
const $ = (id) => document.getElementById(id);
const estado = { dias: [], fecha: null, inicio: null };
const fmtDia = new Intl.DateTimeFormat('es-CO', { weekday: 'short', day: 'numeric', month: 'short', timeZone: TZ });
const fmtHora = new Intl.DateTimeFormat('es-CO', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: TZ });
const pesos = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });

function habilitar() {
  const f = $('formulario');
  $('pagar').disabled = !(estado.inicio && f.autoriza.checked);
}

function pintarHoras() {
  const cont = $('horas');
  cont.replaceChildren();
  const dia = estado.dias.find((d) => d.fecha === estado.fecha);
  for (const inicio of dia?.inicios || []) {
    const b = Object.assign(document.createElement('button'), { type: 'button', className: 'hora', textContent: fmtHora.format(new Date(inicio)) });
    b.setAttribute('aria-pressed', String(inicio === estado.inicio));
    b.onclick = () => { estado.inicio = inicio; pintarHoras(); habilitar(); };
    cont.append(b);
  }
}

function pintarDias() {
  const cont = $('dias');
  cont.replaceChildren();
  for (const d of estado.dias) {
    const b = Object.assign(document.createElement('button'), { type: 'button', className: 'dia', textContent: fmtDia.format(new Date(d.inicios[0])) });
    b.setAttribute('aria-pressed', String(d.fecha === estado.fecha));
    b.onclick = () => { estado.fecha = d.fecha; estado.inicio = null; pintarDias(); pintarHoras(); habilitar(); };
    cont.append(b);
  }
  $('vacio').hidden = estado.dias.length > 0;
}

async function cargar() {
  try {
    const r = await fetch('/api/disponibilidad');
    const j = await r.json();
    if (!r.ok) throw new Error(j.error);
    estado.dias = j.dias;
    $('aviso-prueba').hidden = !j.modoPrueba;
    $('servicio').textContent = `${j.consulta.nombre} · ${j.consulta.duracionMin} minutos por videollamada`;
    $('precio').textContent = pesos.format(j.consulta.precioCOP);
    pintarDias();
  } catch (e) {
    $('servicio').textContent = 'No fue posible cargar la agenda.';
    $('error').textContent = e.message || 'Intente de nuevo en unos minutos.';
  }
}

$('formulario').addEventListener('change', habilitar);
$('formulario').addEventListener('submit', async (ev) => {
  ev.preventDefault();
  const f = ev.target;
  $('error').textContent = '';
  $('pagar').disabled = true;
  try {
    const r = await fetch('/api/reservar', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        inicio: estado.inicio, nombre: f.nombre.value, email: f.email.value,
        telefono: f.telefono.value, tema: f.tema.value, autoriza: f.autoriza.checked,
      }),
    });
    const j = await r.json();
    if (!r.ok) throw new Error(j.error);
    try { sessionStorage.setItem('jac_ref', j.referencia); } catch {}
    location.href = j.url;
  } catch (e) {
    $('error').textContent = e.message || 'No fue posible continuar. Intente de nuevo.';
    if (/horario/.test(e.message)) { estado.inicio = null; cargar(); }
    habilitar();
  }
});
cargar();
