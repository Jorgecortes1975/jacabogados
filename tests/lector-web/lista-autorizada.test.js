'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { validarConfiguracion, ListaAutorizada } = require('../../lector-web/lista-autorizada');
const { LectorWebOficial } = require('../../lector-web');
const { dominio, configPrueba, rutaAuditoriaTmp } = require('./helpers');

// ---------- T005: carga y validación de la configuración ----------

test('configuración válida: aplica valores por defecto', () => {
  const r = validarConfiguracion(configPrueba([dominio('dian.gov.co')]));
  assert.strictEqual(r.ok, true);
  assert.strictEqual(r.config.maxBytes, 5 * 1024 * 1024);
  assert.strictEqual(r.config.timeoutMs, 20000);
  assert.strictEqual(r.config.maxRedirecciones, 3);
});

test('activo: true sin verificadoEn invalida la configuración', () => {
  const d = dominio('dian.gov.co');
  delete d.verificadoEn;
  assert.strictEqual(validarConfiguracion(configPrueba([d])).ok, false);
  assert.strictEqual(validarConfiguracion(configPrueba([{ ...d, verificadoEn: null }])).ok, false);
});

test('activo: true sin fuenteVerificacion invalida la configuración', () => {
  const d = dominio('dian.gov.co');
  assert.strictEqual(validarConfiguracion(configPrueba([{ ...d, fuenteVerificacion: null }])).ok, false);
  assert.strictEqual(validarConfiguracion(configPrueba([{ ...d, fuenteVerificacion: 'abc' }])).ok, false);
});

test('una entrada inactiva sin verificación es válida', () => {
  const r = validarConfiguracion(configPrueba([{ host: 'dian.gov.co', autoridad: 'DIAN', activo: false, verificadoEn: null, fuenteVerificacion: null }]));
  assert.strictEqual(r.ok, true);
});

test('hosts duplicados invalidan la configuración', () => {
  const r = validarConfiguracion(configPrueba([dominio('dian.gov.co'), dominio('dian.gov.co')]));
  assert.strictEqual(r.ok, false);
  assert.match(r.motivo, /duplicado/i);
});

for (const host of [
  '10.0.0.1', '127.0.0.1', 'dian.gov.co:443', 'dian.gov.co/ruta', 'https://dian.gov.co',
  'DIAN.gov.co', 'dián.gov.co', 'dian.gov.co.', 'dian', '', 'a..b.co', '-dian.gov.co', 'dian.gov.123',
]) {
  test(`host no válido rechazado: "${host}"`, () => {
    assert.strictEqual(validarConfiguracion(configPrueba([dominio(host)])).ok, false);
  });
}

for (const clave of ['puerto', 'ca', 'permitirLoopback', 'opcionesRedPrueba']) {
  test(`la configuración de producción no admite la clave "${clave}"`, () => {
    // En el nivel superior
    const alto = validarConfiguracion({ ...configPrueba(), [clave]: 8443 });
    assert.strictEqual(alto.ok, false);
    // Dentro de un dominio
    const anidado = validarConfiguracion(configPrueba([{ ...dominio('dian.gov.co'), [clave]: true }]));
    assert.strictEqual(anidado.ok, false);
  });
}

test('faltan enabled o dominios: configuración inválida', () => {
  assert.strictEqual(validarConfiguracion({ dominios: [] }).ok, false);
  assert.strictEqual(validarConfiguracion({ enabled: true }).ok, false);
  assert.strictEqual(validarConfiguracion(undefined).ok, false);
  assert.strictEqual(validarConfiguracion([]).ok, false);
});

test('límites fuera de rango invalidan la configuración', () => {
  assert.strictEqual(validarConfiguracion(configPrueba([], { maxBytes: 10 })).ok, false);
  assert.strictEqual(validarConfiguracion(configPrueba([], { timeoutMs: 100 })).ok, false);
  assert.strictEqual(validarConfiguracion(configPrueba([], { maxRedirecciones: 99 })).ok, false);
});

test('falla cerrada: configuración inválida deja el lector deshabilitado', async () => {
  const lector = new LectorWebOficial({
    config: configPrueba([{ ...dominio('dian.gov.co'), verificadoEn: null }]),
    rutaAuditoria: rutaAuditoriaTmp(),
  });
  assert.strictEqual(lector.estado().habilitado, false);
  const r = await lector.leer('https://dian.gov.co/');
  assert.strictEqual(r.ok, false);
  assert.strictEqual(r.codigo, 'LECTOR_DESHABILITADO');
});

test('enabled: false deja el lector deshabilitado', async () => {
  const lector = new LectorWebOficial({ config: configPrueba([dominio('dian.gov.co')], { enabled: false }), rutaAuditoria: rutaAuditoriaTmp() });
  const r = await lector.leer('https://dian.gov.co/');
  assert.strictEqual(r.codigo, 'LECTOR_DESHABILITADO');
});

// ---------- T011: coincidencia de dominios ----------

function lista(...dominios) {
  return new ListaAutorizada(dominios);
}

test('coincidencia exacta', () => {
  const l = lista(dominio('www.dian.gov.co'));
  assert.ok(l.coincidir('www.dian.gov.co'));
  assert.ok(l.coincidir('WWW.DIAN.GOV.CO'));
});

test('un subdominio solo coincide si la entrada lo declara', () => {
  const sin = lista(dominio('dian.gov.co'));
  assert.strictEqual(sin.coincidir('www.dian.gov.co'), null);
  const con = lista(dominio('dian.gov.co', { incluyeSubdominios: true }));
  assert.ok(con.coincidir('www.dian.gov.co'));
  assert.ok(con.coincidir('a.b.dian.gov.co'));
  assert.ok(con.coincidir('dian.gov.co'));
});

for (const falso of [
  'dian.gov.co.ejemplo.com',
  'www.dian.gov.co@ejemplo.com',
  'xdian.gov.co',
  'dian.gov.co.',
  'dian-gov-co.ejemplo.com',
  'ejemplo.com/dian.gov.co',
  'gov.co',
  'co',
  '',
]) {
  test(`dominio engañoso o ajeno rechazado: "${falso}"`, () => {
    const l = lista(dominio('dian.gov.co', { incluyeSubdominios: true }));
    assert.strictEqual(l.coincidir(falso), null);
  });
}

test('un dominio inactivo no coincide', () => {
  const l = lista(dominio('dian.gov.co', { activo: false, verificadoEn: null, fuenteVerificacion: null }));
  assert.strictEqual(l.coincidir('dian.gov.co'), null);
});

test('la lista expone autoridad y estado', () => {
  const l = lista(dominio('dian.gov.co'), dominio('otra.gov.co', { activo: false, verificadoEn: null, fuenteVerificacion: null }));
  assert.strictEqual(l.todas().length, 2);
  assert.strictEqual(l.activos().length, 1);
  assert.match(l.todas()[0].autoridad, /dian/);
});
