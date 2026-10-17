const TZ = 'America/Bogota';
const $ = (id) => document.getElementById(id);
const estado = { dias: [], fecha: null, inicio: null };
const fmtDia = new Intl.DateTimeFormat('es-CO', { weekday: 'short', day: 'numeric', month: 'short', timeZone: TZ });
const fmtHora = new Intl.DateTimeFormat('es-CO', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: TZ });
const pesos = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });

function habilitar() {
  const f = $('formulario');
  const falta = [!estado.inicio && 'escoger un día y una hora', !f.autoriza.checked && 'marcar la autorización de datos'].filter(Boolean);
  $('pagar').disabled = falta.length > 0;
  $('falta').textContent = falta.length ? `Para continuar falta: ${falta.join(' y ')}.` : '';
}

// Cada opción es un botón de radio con etiqueta: con teclado basta un Tab para entrar al grupo y las flechas para moverse.
function opcion(grupo, valor, texto, marcado) {
  const id = `${grupo}-${valor}`;
  const r = Object.assign(document.createElement('input'), { type: 'radio', name: grupo, id, value: valor, checked: marcado });
  const l = Object.assign(document.createElement('label'), { htmlFor: id, textContent: texto, className: 'opcion' });
  const envoltura = Object.assign(document.createElement('span'), { className: 'opcion-envoltura' });
  envoltura.append(r, l);
  return envoltura;
}

function pintarHoras() {
  const dia = estado.dias.find((d) => d.fecha === estado.fecha);
  $('horas').replaceChildren(...(dia?.inicios || []).map((i) => opcion('hora', i, fmtHora.format(new Date(i)), i === estado.inicio)));
}

function pintarDias() {
  $('dias').replaceChildren(...estado.dias.map((d) => opcion('dia', d.fecha, fmtDia.format(new Date(d.inicios[0])), d.fecha === estado.fecha)));
  $('vacio').hidden = estado.dias.length > 0;
}

$('dias').addEventListener('change', (e) => { estado.fecha = e.target.value; estado.inicio = null; pintarHoras(); habilitar(); });
$('horas').addEventListener('change', (e) => { estado.inicio = e.target.value; habilitar(); });

async function cargar() {
  try {
    const r = await fetch('/api/disponibilidad');
    const j = await r.json();
    if (!r.ok) throw new Error(j.error);
    estado.dias = j.dias;
    if (!estado.dias.some((d) => d.fecha === estado.fecha)) estado.fecha = null;
    $('aviso-prueba').hidden = !j.modoPrueba;
    $('servicio').textContent = `${j.consulta.nombre} · ${j.consulta.duracionMin} minutos por videollamada`;
    $('precio').textContent = pesos.format(j.consulta.precioCOP);
    pintarDias();
    pintarHoras();
    habilitar();
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
habilitar();
