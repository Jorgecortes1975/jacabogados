'use strict';

const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const { Auditoria, limpiarUrl } = require('../../lector-web/auditoria');
const { tmpDir, rutaAuditoriaTmp, leerAuditoria } = require('./helpers');

const FIJA = () => new Date('2026-10-10T12:00:00.000Z');

test('escribe una línea JSON por solicitud con los campos del modelo de datos', () => {
  const ruta = rutaAuditoriaTmp();
  const a = new Auditoria(ruta, FIJA);
  assert.strictEqual(a.registrar({ urlSolicitada: 'https://x.gov.co/a', dominio: 'x.gov.co', resultado: 'OK', hashContenido: 'abc', duracionMs: 12 }), true);
  assert.strictEqual(a.registrar({ urlSolicitada: 'https://y.com/', resultado: 'FALLO', codigo: 'FUENTE_NO_AUTORIZADA', duracionMs: 1 }), true);
  const filas = leerAuditoria(ruta);
  assert.strictEqual(filas.length, 2);
  assert.deepStrictEqual(Object.keys(filas[0]).sort(), ['codigo', 'dominio', 'duracionMs', 'fecha', 'hashContenido', 'resultado', 'urlSolicitada']);
  assert.strictEqual(filas[0].fecha, '2026-10-10T12:00:00.000Z');
  assert.strictEqual(filas[1].codigo, 'FUENTE_NO_AUTORIZADA');
});

test('crea la carpeta si no existe', () => {
  const ruta = path.join(tmpDir(), 'a', 'b', 'c', 'auditoria.jsonl');
  assert.strictEqual(new Auditoria(ruta, FIJA).registrar({ urlSolicitada: 'https://x.gov.co/', resultado: 'OK' }), true);
  assert.ok(fs.existsSync(ruta));
});

test('el archivo se crea con permisos restrictivos', { skip: process.platform === 'win32' }, () => {
  const ruta = rutaAuditoriaTmp();
  new Auditoria(ruta, FIJA).registrar({ urlSolicitada: 'https://x.gov.co/', resultado: 'OK' });
  assert.strictEqual(fs.statSync(ruta).mode & 0o077, 0);
});

test('no guarda usuario ni contraseña de la dirección', () => {
  const ruta = rutaAuditoriaTmp();
  new Auditoria(ruta, FIJA).registrar({ urlSolicitada: 'https://persona:secreto@x.gov.co/', resultado: 'FALLO', codigo: 'URL_INVALIDA' });
  const crudo = fs.readFileSync(ruta, 'utf8');
  assert.ok(!crudo.includes('secreto'));
  assert.ok(!crudo.includes('persona'));
  assert.strictEqual(limpiarUrl('https://u:p@h.co/x'), 'https://***@h.co/x');
});

test('nunca lanza: devuelve false si no puede escribir', () => {
  const archivo = path.join(tmpDir(), 'archivo');
  fs.writeFileSync(archivo, 'x');
  // La "carpeta" padre es un archivo: mkdir falla
  const a = new Auditoria(path.join(archivo, 'sub', 'auditoria.jsonl'), FIJA);
  assert.strictEqual(a.registrar({ urlSolicitada: 'https://x.gov.co/', resultado: 'OK' }), false);
});
