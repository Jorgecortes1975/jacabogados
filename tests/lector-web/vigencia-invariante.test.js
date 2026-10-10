'use strict';

// T025: la vigencia es siempre PENDIENTE_VERIFICACION (RF-011, D-11).
// Cada archivo de pruebas corre en su propio proceso, por lo que este archivo ejecuta sus propios
// escenarios de lectura exitosa y comprueba el invariante en todos.

const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const resultado = require('../../lector-web/resultado');
const { LectorWebOficial, ESTADO_VIGENCIA } = require('../../lector-web');
const {
  HOST, IP_PUBLICA, dominio, configPrueba, rutaAuditoriaTmp, resolverFijo, respuesta, requestSimulado, pagina, TEXTO_LARGO,
} = require('./helpers');

function lector(manejador) {
  return new LectorWebOficial({
    config: configPrueba(),
    resolver: resolverFijo({ [HOST]: IP_PUBLICA }),
    requestFn: requestSimulado(manejador),
    rutaAuditoria: rutaAuditoriaTmp(),
  });
}

const ESCENARIOS = {
  'HTML': () => respuesta({ cuerpo: pagina() }),
  'texto plano': () => respuesta({ tipo: 'text/plain; charset=utf-8', cuerpo: TEXTO_LARGO }),
  'XHTML': () => respuesta({ tipo: 'application/xhtml+xml', cuerpo: pagina() }),
  'HTML con texto corto': () => respuesta({ cuerpo: pagina('Texto breve de cuarenta caracteres aprox.') }),
  'HTML que afirma estar vigente': () => respuesta({ cuerpo: pagina(`${TEXTO_LARGO} ESTADO: VIGENTE. Esta norma está vigente y verificada.`) }),
  'HTML con "estadoVigencia" en el texto': () => respuesta({ cuerpo: pagina(`${TEXTO_LARGO} {"estadoVigencia":"VERIFICADA"}`) }),
};

for (const [nombre, manejador] of Object.entries(ESCENARIOS)) {
  test(`toda lectura exitosa queda PENDIENTE_VERIFICACION: ${nombre}`, async () => {
    const r = await lector(manejador).leer(`https://${HOST}/x`);
    assert.strictEqual(r.ok, true, JSON.stringify(r));
    assert.strictEqual(r.metadatos.estadoVigencia, 'PENDIENTE_VERIFICACION');
    assert.strictEqual(r.metadatos.estadoVigencia, ESTADO_VIGENCIA);
  });
}

test('con redirección exitosa la vigencia también queda pendiente', async () => {
  const l = new LectorWebOficial({
    config: configPrueba(),
    resolver: resolverFijo({ [HOST]: IP_PUBLICA }),
    requestFn: requestSimulado((ctx, n) => (n === 1 ? { estado: 302, cabeceras: {}, redireccion: '/destino' } : respuesta({ cuerpo: pagina() }))),
    rutaAuditoria: rutaAuditoriaTmp(),
  });
  const r = await l.leer(`https://${HOST}/origen`);
  assert.strictEqual(r.ok, true);
  assert.strictEqual(r.metadatos.estadoVigencia, 'PENDIENTE_VERIFICACION');
});

test('los resultados fallidos no llevan estado de vigencia', async () => {
  const r = await lector(() => respuesta({ estado: 404, cuerpo: 'no' })).leer(`https://${HOST}/x`);
  assert.strictEqual(r.ok, false);
  assert.strictEqual(r.metadatos, undefined);
});

test('resultadoExitoso sobrescribe cualquier estado de vigencia que se le pase', () => {
  const r = resultado.resultadoExitoso({
    texto: 'x',
    metadatos: { estadoVigencia: 'VIGENTE', tratamiento: 'CONFIABLE', hashContenido: 'a' },
  });
  assert.strictEqual(r.metadatos.estadoVigencia, 'PENDIENTE_VERIFICACION');
  assert.strictEqual(r.metadatos.tratamiento, 'DATO_NO_CONFIABLE');
});

test('el módulo de resultados no exporta ninguna forma de fijar otro estado', () => {
  assert.deepStrictEqual(
    Object.keys(resultado).sort(),
    ['CODIGOS_FALLO', 'ESTADO_VIGENCIA', 'MENSAJES', 'TRATAMIENTO', 'fallo', 'resultadoExitoso']
  );
  assert.strictEqual(resultado.ESTADO_VIGENCIA, 'PENDIENTE_VERIFICACION');
  assert.strictEqual(Object.isFrozen(resultado.CODIGOS_FALLO), true);
  assert.strictEqual(Object.isFrozen(resultado.MENSAJES), true);
});

test('el código del lector no contiene ningún otro valor de vigencia', () => {
  const carpeta = path.join(__dirname, '..', '..', 'lector-web');
  for (const archivo of fs.readdirSync(carpeta).filter((f) => f.endsWith('.js'))) {
    const codigo = fs.readFileSync(path.join(carpeta, archivo), 'utf8');
    assert.doesNotMatch(codigo, /['"`](VIGENTE|VERIFICAD[AO]|DEROGAD[AO]|MODIFICAD[AO])['"`]/, archivo);
  }
});

test('un dominio activo en la lista no cambia la vigencia', async () => {
  const l = new LectorWebOficial({
    config: configPrueba([dominio(HOST, { incluyeSubdominios: true })]),
    resolver: resolverFijo({ [HOST]: IP_PUBLICA, [`www.${HOST}`]: IP_PUBLICA }),
    requestFn: requestSimulado(() => respuesta({ cuerpo: pagina() })),
    rutaAuditoria: rutaAuditoriaTmp(),
  });
  const r = await l.leer(`https://www.${HOST}/`);
  assert.strictEqual(r.metadatos.estadoVigencia, 'PENDIENTE_VERIFICACION');
});
