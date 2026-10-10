'use strict';

// T035: subcomandos `leer` y `fuentes-web`, y no regresión de los comandos existentes.
// Cada prueba corre el agente en una carpeta temporal con una copia de mcp-config.json
// (el agente lee y escribe mcp-config.json en el directorio de trabajo).

const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { validarConfiguracion } = require('../../lector-web/lista-autorizada');
const { tmpDir } = require('./helpers');

const RAIZ = path.join(__dirname, '..', '..');
const AGENTE = path.join(RAIZ, 'agente-juridico-especializado.js');
const CONFIG_REPO = JSON.parse(fs.readFileSync(path.join(RAIZ, 'mcp-config.json'), 'utf8'));

function entorno(mutar) {
  const dir = tmpDir('lector-cli-');
  const cfg = JSON.parse(JSON.stringify(CONFIG_REPO));
  cfg.lectorWeb.rutaAuditoria = path.join(dir, 'auditoria.jsonl'); // nunca escribir en logs/ del repositorio
  if (mutar) mutar(cfg);
  fs.writeFileSync(path.join(dir, 'mcp-config.json'), JSON.stringify(cfg, null, 2));
  return dir;
}

function correr(dir, ...args) {
  return spawnSync(process.execPath, [AGENTE, ...args], { cwd: dir, encoding: 'utf8', timeout: 30000 });
}

function configEnDisco(dir) {
  return JSON.parse(fs.readFileSync(path.join(dir, 'mcp-config.json'), 'utf8'));
}

// ---------- Configuración del repositorio ----------

test('la configuración lectorWeb del repositorio es válida', () => {
  const r = validarConfiguracion(CONFIG_REPO.lectorWeb);
  assert.strictEqual(r.ok, true, r.motivo);
  assert.ok(CONFIG_REPO.lectorWeb.dominios.length >= 9);
});

test('todo dominio activo del repositorio tiene verificación registrada', () => {
  for (const d of CONFIG_REPO.lectorWeb.dominios.filter((x) => x.activo)) {
    assert.ok(d.verificadoEn && d.fuenteVerificacion, `${d.host} activo sin verificación`);
  }
});

test('la capacidad lectura-web-oficial está declarada en mcp-config.json', () => {
  const cap = CONFIG_REPO.agents['juridico-especializado'].capacidades['lectura-web-oficial'];
  assert.ok(cap);
  assert.match(cap.descripcion, /No determina vigencia/);
});

test('la configuración del repositorio no admite opciones de red de prueba', () => {
  const claves = JSON.stringify(CONFIG_REPO.lectorWeb);
  for (const prohibida of ['opcionesRedPrueba', 'permitirLoopback', '"puerto"', '"ca"']) {
    assert.ok(!claves.includes(prohibida), prohibida);
  }
});

// ---------- fuentes-web ----------

test('fuentes-web lista dominios con autoridad y estado', () => {
  const dir = entorno();
  const r = correr(dir, 'fuentes-web');
  assert.strictEqual(r.status, 0, r.stderr);
  assert.match(r.stdout, /DOMINIOS AUTORIZADOS PARA LECTURA WEB OFICIAL/);
  assert.match(r.stdout, /www\.dian\.gov\.co/);
  assert.match(r.stdout, /Autoridad: Dirección de Impuestos y Aduanas Nacionales/);
  assert.match(r.stdout, new RegExp(`Total: ${CONFIG_REPO.lectorWeb.dominios.length} \\| Activos: ${CONFIG_REPO.lectorWeb.dominios.filter((d) => d.activo).length}`));
  if (!CONFIG_REPO.lectorWeb.dominios.some((d) => d.activo)) assert.match(r.stdout, /PENDIENTE DE VERIFICACIÓN/);
});

test('fuentes-web informa cuando el lector está deshabilitado', () => {
  const dir = entorno((cfg) => { cfg.lectorWeb.dominios[0].activo = true; }); // activo sin verificación: configuración inválida
  const r = correr(dir, 'fuentes-web');
  assert.strictEqual(r.status, 0);
  assert.match(r.stdout, /Lector deshabilitado/);
});

// ---------- leer ----------

test('leer sin URL sale con código 2', () => {
  const r = correr(entorno(), 'leer');
  assert.strictEqual(r.status, 2);
  assert.match(r.stderr, /Uso:/);
});

test('leer de un dominio no autorizado sale con código 1 y mensaje en español', () => {
  const dir = entorno();
  const r = correr(dir, 'leer', 'https://ejemplo.com/pagina');
  assert.strictEqual(r.status, 1, r.stderr);
  assert.match(r.stdout, /No se pudo leer la página/);
  assert.match(r.stdout, /Código: FUENTE_NO_AUTORIZADA/);
  assert.match(r.stdout, /no está en la lista de fuentes oficiales/);
  const bitacora = fs.readFileSync(path.join(dir, 'auditoria.jsonl'), 'utf8');
  assert.match(bitacora, /FUENTE_NO_AUTORIZADA/);
});

test('leer rechaza direcciones inseguras con código 1', () => {
  for (const url of ['http://www.dian.gov.co/', 'https://127.0.0.1/', 'file:///etc/passwd']) {
    const r = correr(entorno(), 'leer', url);
    assert.strictEqual(r.status, 1, url);
    assert.match(r.stdout, /URL_INVALIDA/, url);
  }
});

test('leer --json imprime la estructura del contrato', () => {
  const r = correr(entorno(), 'leer', 'https://ejemplo.com/', '--json');
  assert.strictEqual(r.status, 1);
  const obj = JSON.parse(r.stdout);
  assert.strictEqual(obj.ok, false);
  assert.strictEqual(obj.codigo, 'FUENTE_NO_AUTORIZADA');
  assert.ok(obj.mensaje && obj.detalle);
});

test('leer --json antes de la URL también funciona', () => {
  const r = correr(entorno(), 'leer', '--json', 'https://ejemplo.com/');
  assert.strictEqual(r.status, 1);
  assert.strictEqual(JSON.parse(r.stdout).codigo, 'FUENTE_NO_AUTORIZADA');
});

test('leer con la sección lectorWeb ausente falla cerrada', () => {
  const dir = entorno((cfg) => { delete cfg.lectorWeb; });
  const r = correr(dir, 'leer', 'https://www.dian.gov.co/');
  assert.strictEqual(r.status, 1);
  assert.match(r.stdout, /LECTOR_DESHABILITADO/);
});

test('la salida de una lectura exitosa muestra trazabilidad y la vigencia pendiente', () => {
  const dir = entorno();
  const guion = `
    const { AgentJuridicoEspecializado } = require(${JSON.stringify(AGENTE)});
    new AgentJuridicoEspecializado().imprimirLectura({
      ok: true, texto: 'TEXTO DE LA PAGINA', advertencias: ['Aviso de prueba'],
      metadatos: { autoridad: 'Autoridad X', dominio: 'x.gov.co', urlSolicitada: 'https://x.gov.co/a', urlFinal: 'https://x.gov.co/b',
        redirecciones: ['https://x.gov.co/b'], fechaConsulta: '2026-10-10T15:00:00.000Z', estadoHttp: 200, tipoContenido: 'text/html',
        bytes: 10, hashContenido: 'a'.repeat(64), hashTexto: 'b'.repeat(64), estadoVigencia: 'PENDIENTE_VERIFICACION' } });`;
  const r = spawnSync(process.execPath, ['-e', guion], { cwd: dir, encoding: 'utf8' });
  assert.strictEqual(r.status, 0, r.stderr);
  for (const esperado of [
    /Autoridad: Autoridad X/, /Dirección consultada: https:\/\/x\.gov\.co\/a/, /Dirección final: https:\/\/x\.gov\.co\/b/,
    /2026-10-10T15:00:00\.000Z/, /Huella del contenido \(SHA-256\): a{64}/, /Huella del texto \(SHA-256\): b{64}/,
    /Vigencia: PENDIENTE DE VERIFICACION\. Este texto no confirma que la norma o providencia esté vigente\./,
    /Aviso de prueba/, /TEXTO DE LA PAGINA/,
  ]) assert.match(r.stdout, esperado);
});

// ---------- activar conserva la capacidad y la sección lectorWeb ----------

test('activar conserva la capacidad lectura-web-oficial y no altera lectorWeb', () => {
  const dir = entorno((cfg) => { delete cfg.agents['juridico-especializado'].capacidades['lectura-web-oficial']; });
  const antes = configEnDisco(dir).lectorWeb;
  const r = correr(dir, 'activar');
  assert.strictEqual(r.status, 0, r.stderr);
  const despues = configEnDisco(dir);
  assert.ok(despues.agents['juridico-especializado'].capacidades['lectura-web-oficial'], 'la capacidad debe existir tras activar');
  assert.deepStrictEqual(despues.lectorWeb, antes);
});

test('activar sobre una configuración que ya tiene la capacidad la mantiene', () => {
  const dir = entorno();
  assert.strictEqual(correr(dir, 'activar').status, 0);
  assert.ok(configEnDisco(dir).agents['juridico-especializado'].capacidades['lectura-web-oficial']);
});

// ---------- No regresión de los comandos existentes ----------

test('help sigue funcionando y documenta los subcomandos nuevos', () => {
  const r = correr(entorno(), 'help');
  assert.strictEqual(r.status, 0);
  assert.match(r.stdout, /consulta <tipo>/);
  assert.match(r.stdout, /leer "<url https/);
  assert.match(r.stdout, /fuentes-web/);
});

test('fuentes y consulta conservan su comportamiento', () => {
  const dir = entorno();
  const f = correr(dir, 'fuentes');
  assert.strictEqual(f.status, 0);
  assert.match(f.stdout, /FUENTES OFICIALES COLOMBIANAS INTEGRADAS/);
  const c = correr(dir, 'consulta', 'jurisprudencia', 'despido');
  assert.strictEqual(c.status, 0);
  assert.match(c.stdout, /Tipo de consulta: jurisprudencia/);
});

test('un comando desconocido sigue saliendo con código 1 y menciona los nuevos', () => {
  const r = correr(entorno(), 'inexistente');
  assert.strictEqual(r.status, 1);
  assert.match(r.stderr, /fuentes-web, leer/);
});
