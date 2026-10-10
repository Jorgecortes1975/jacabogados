'use strict';

const test = require('node:test');
const assert = require('node:assert');
const zlib = require('node:zlib');
const { esDireccionProhibida, validarDestino, crearLookup, ErrorLector } = require('../../lector-web/red-segura');
const { LectorWebOficial } = require('../../lector-web');
const {
  HOST, dominio, configPrueba, rutaAuditoriaTmp, resolverFijo, pagina, certificadoPrueba, servidorHttps,
} = require('./helpers');

// ---------- T016: rangos prohibidos ----------

const PROHIBIDAS = [
  '0.0.0.0', '0.1.2.3', '10.0.0.1', '10.255.255.255', '100.64.0.1', '100.127.255.255', '127.0.0.1', '127.255.255.255',
  '169.254.169.254', '169.254.0.1', '172.16.0.1', '172.31.255.255', '192.0.0.1', '192.0.2.1', '192.168.0.1',
  '192.168.255.255', '198.18.0.1', '198.19.255.255', '198.51.100.7', '203.0.113.9', '224.0.0.1', '239.255.255.255',
  '240.0.0.1', '255.255.255.255',
  '::', '::1', 'fc00::1', 'fd12:3456::1', 'fe80::1', 'fe80::1%eth0', 'febf::1', 'fec0::1', 'ff02::1', '2001:db8::1',
  '2001:0:4136:e378:8000:63bf:3fff:fdd2',
  '::ffff:127.0.0.1', '::ffff:10.0.0.1', '::ffff:169.254.169.254', '::ffff:7f00:1', '::127.0.0.1',
  '64:ff9b::7f00:1', '2002:7f00:1::1', '2002:c0a8:1::1',
  'no es una direccion', '', undefined, null,
];

const PUBLICAS = [
  '1.1.1.1', '8.8.8.8', '93.184.216.34', '100.63.255.255', '100.128.0.1', '172.15.255.255', '172.32.0.1',
  '169.253.255.255', '192.167.255.255', '192.169.0.1', '198.17.255.255', '198.20.0.1', '223.255.255.255',
  '2606:4700:4700::1111', '2001:4860:4860::8888', '::ffff:8.8.8.8', '64:ff9b::808:808',
];

for (const ip of PROHIBIDAS) {
  test(`dirección prohibida: ${JSON.stringify(ip)}`, () => {
    assert.strictEqual(esDireccionProhibida(ip), true);
  });
}

for (const ip of PUBLICAS) {
  test(`dirección pública aceptada: ${ip}`, () => {
    assert.strictEqual(esDireccionProhibida(ip), false);
  });
}

test('permitirLoopback exonera solo 127.0.0.0/8 y ::1', () => {
  const o = { permitirLoopback: true };
  for (const ip of ['127.0.0.1', '127.1.2.3', '::1', '::ffff:127.0.0.1']) assert.strictEqual(esDireccionProhibida(ip, o), false, ip);
  for (const ip of ['10.0.0.1', '169.254.169.254', '192.168.0.1', '0.0.0.0', '::', 'fe80::1', 'fc00::1']) {
    assert.strictEqual(esDireccionProhibida(ip, o), true, ip);
  }
});

// ---------- T017: resolución y lookup ----------

test('un nombre que resuelve a un rango prohibido devuelve DESTINO_NO_PUBLICO', async () => {
  const resolver = resolverFijo({ 'a.gov.co': '10.0.0.5' });
  await assert.rejects(validarDestino('a.gov.co', { resolver }), (e) => e instanceof ErrorLector && e.codigoFallo === 'DESTINO_NO_PUBLICO');
});

test('si el resolutor devuelve varias direcciones y una es prohibida, se rechaza', async () => {
  const resolver = resolverFijo({ 'a.gov.co': ['93.184.216.34', '169.254.169.254'] });
  await assert.rejects(validarDestino('a.gov.co', { resolver }), (e) => e.codigoFallo === 'DESTINO_NO_PUBLICO');
});

test('un dominio que no resuelve devuelve FUENTE_NO_DISPONIBLE', async () => {
  const resolver = resolverFijo({});
  await assert.rejects(validarDestino('nada.gov.co', { resolver }), (e) => e.codigoFallo === 'FUENTE_NO_DISPONIBLE');
});

test('lookup atiende el modo de una dirección', async () => {
  const lookup = crearLookup({ resolver: resolverFijo({ 'a.gov.co': ['93.184.216.34', '8.8.8.8'] }) });
  const r = await new Promise((resolve) => lookup('a.gov.co', {}, (err, addr, fam) => resolve({ err, addr, fam })));
  assert.strictEqual(r.err, null);
  assert.strictEqual(r.addr, '93.184.216.34');
  assert.strictEqual(r.fam, 4);
});

test('lookup atiende el modo de todas las direcciones (all: true)', async () => {
  const lookup = crearLookup({ resolver: resolverFijo({ 'a.gov.co': ['93.184.216.34', '2606:4700:4700::1111'] }) });
  const r = await new Promise((resolve) => lookup('a.gov.co', { all: true }, (err, lista) => resolve({ err, lista })));
  assert.strictEqual(r.err, null);
  assert.deepStrictEqual(r.lista.map((d) => d.family), [4, 6]);
});

test('lookup valida todas las direcciones en ambos modos', async () => {
  const lookup = crearLookup({ resolver: resolverFijo({ 'a.gov.co': ['93.184.216.34', '10.0.0.1'] }) });
  for (const opciones of [{}, { all: true }]) {
    const err = await new Promise((resolve) => lookup('a.gov.co', opciones, (e) => resolve(e)));
    assert.ok(err instanceof ErrorLector);
    assert.strictEqual(err.codigoFallo, 'DESTINO_NO_PUBLICO');
  }
});

test('lookup acepta la firma de dos argumentos', async () => {
  const lookup = crearLookup({ resolver: resolverFijo({ 'a.gov.co': '93.184.216.34' }) });
  const r = await new Promise((resolve) => lookup('a.gov.co', (err, addr) => resolve({ err, addr })));
  assert.strictEqual(r.addr, '93.184.216.34');
});

// ---------- T030: límites con servidor local (código real de red) ----------

const sinOpenssl = certificadoPrueba() === null;

async function lectorLocal(servidor, extra = {}, dominios = [dominio(HOST)]) {
  return new LectorWebOficial({
    config: configPrueba(dominios, extra),
    resolver: resolverFijo({ [HOST]: '127.0.0.1' }),
    opcionesRedPrueba: { puerto: servidor.puerto, ca: servidor.cert, permitirLoopback: true },
    rutaAuditoria: rutaAuditoriaTmp(),
  });
}

test('cuerpo mayor a maxBytes → TAMANO_EXCEDIDO sin contenido parcial', { skip: sinOpenssl }, async () => {
  const srv = await servidorHttps((req, res) => {
    res.writeHead(200, { 'content-type': 'text/html' });
    res.end(pagina('x'.repeat(5000)));
  });
  try {
    const r = await (await lectorLocal(srv, { maxBytes: 2048 })).leer(`https://${HOST}/`);
    assert.strictEqual(r.ok, false);
    assert.strictEqual(r.codigo, 'TAMANO_EXCEDIDO');
    assert.strictEqual(r.texto, undefined);
  } finally {
    await srv.cerrar();
  }
});

test('cuerpo sin Content-Length que supera el límite → TAMANO_EXCEDIDO', { skip: sinOpenssl }, async () => {
  const srv = await servidorHttps((req, res) => {
    res.writeHead(200, { 'content-type': 'text/html' });
    res.write('a'.repeat(1500));
    res.write('b'.repeat(1500));
    res.end('c'.repeat(1500));
  });
  try {
    const r = await (await lectorLocal(srv, { maxBytes: 2048 })).leer(`https://${HOST}/`);
    assert.strictEqual(r.codigo, 'TAMANO_EXCEDIDO');
  } finally {
    await srv.cerrar();
  }
});

test('contenido comprimido pequeño que se expande por encima del límite → TAMANO_EXCEDIDO', { skip: sinOpenssl }, async () => {
  const comprimido = zlib.gzipSync(Buffer.alloc(300000, 'a'));
  assert.ok(comprimido.length < 2048, 'el contenido comprimido debe ser menor que el límite');
  const srv = await servidorHttps((req, res) => {
    res.writeHead(200, { 'content-type': 'text/html', 'content-encoding': 'gzip' });
    res.end(comprimido);
  });
  try {
    const r = await (await lectorLocal(srv, { maxBytes: 20000 })).leer(`https://${HOST}/`);
    assert.strictEqual(r.codigo, 'TAMANO_EXCEDIDO');
  } finally {
    await srv.cerrar();
  }
});

test('contenido gzip dentro del límite se descomprime y se lee', { skip: sinOpenssl }, async () => {
  const srv = await servidorHttps((req, res) => {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8', 'content-encoding': 'gzip' });
    res.end(zlib.gzipSync(Buffer.from(pagina(), 'utf8')));
  });
  try {
    const r = await (await lectorLocal(srv)).leer(`https://${HOST}/`);
    assert.strictEqual(r.ok, true, JSON.stringify(r));
    assert.match(r.texto, /Texto jurídico de prueba/);
  } finally {
    await srv.cerrar();
  }
});

test('Content-Length declarado mayor al límite → TAMANO_EXCEDIDO', { skip: sinOpenssl }, async () => {
  const srv = await servidorHttps((req, res) => {
    res.writeHead(200, { 'content-type': 'text/html', 'content-length': '999999999' });
    res.write('x');
    setTimeout(() => res.destroy(), 200);
  });
  try {
    const r = await (await lectorLocal(srv, { maxBytes: 4096 })).leer(`https://${HOST}/`);
    assert.strictEqual(r.codigo, 'TAMANO_EXCEDIDO');
  } finally {
    await srv.cerrar();
  }
});

test('servidor que no responde → TIEMPO_AGOTADO dentro del tiempo configurado', { skip: sinOpenssl }, async () => {
  const srv = await servidorHttps(() => { /* nunca responde */ });
  try {
    const lector = await lectorLocal(srv, { timeoutMs: 1000 });
    const t0 = Date.now();
    const r = await lector.leer(`https://${HOST}/`);
    const ms = Date.now() - t0;
    assert.strictEqual(r.codigo, 'TIEMPO_AGOTADO');
    assert.ok(ms < 3500, `tardó ${ms} ms`);
  } finally {
    await srv.cerrar();
  }
});

test('servidor lento que gotea el cuerpo → TIEMPO_AGOTADO (el límite cubre toda la operación)', { skip: sinOpenssl }, async () => {
  let temporizador;
  const srv = await servidorHttps((req, res) => {
    res.writeHead(200, { 'content-type': 'text/html' });
    temporizador = setInterval(() => res.write('x'), 100);
  });
  try {
    const t0 = Date.now();
    const r = await (await lectorLocal(srv, { timeoutMs: 1000 })).leer(`https://${HOST}/`);
    assert.strictEqual(r.codigo, 'TIEMPO_AGOTADO');
    assert.ok(Date.now() - t0 < 3500);
  } finally {
    clearInterval(temporizador);
    await srv.cerrar();
  }
});

// ---------- Resolutor real del sistema (sin acceso a internet: usa /etc/hosts) ----------

test('con el resolutor real, "localhost" se rechaza como DESTINO_NO_PUBLICO', async () => {
  await assert.rejects(validarDestino('localhost'), (e) => e instanceof ErrorLector && e.codigoFallo === 'DESTINO_NO_PUBLICO');
});

test('con el resolutor real, lookup valida y rechaza "localhost" en ambos modos', async () => {
  const lookup = crearLookup();
  for (const opciones of [{}, { all: true }]) {
    const err = await new Promise((resolve) => lookup('localhost', opciones, (e) => resolve(e)));
    assert.ok(err instanceof ErrorLector, 'debía rechazar');
    assert.strictEqual(err.codigoFallo, 'DESTINO_NO_PUBLICO');
  }
});
