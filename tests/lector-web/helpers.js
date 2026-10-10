'use strict';

// Utilidades de prueba del lector web. No es un archivo de pruebas (no termina en .test.js).
// El certificado TLS de prueba se genera con `openssl` al ejecutar las pruebas: no se versiona ninguna clave.

const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const https = require('node:https');
const { execFileSync } = require('node:child_process');

const HOST = 'lector-prueba.test';
const HOST2 = 'segundo.test';
const HOST_INTERNO = 'interno.test';
const IP_PUBLICA = '93.184.216.34';

function dominio(host, extra = {}) {
  return {
    host,
    autoridad: `Autoridad de prueba ${host}`,
    activo: true,
    verificadoEn: '2026-10-10',
    fuenteVerificacion: 'Verificación de prueba (no es de producción)',
    ...extra,
  };
}

function configPrueba(dominios = [dominio(HOST)], extra = {}) {
  return { enabled: true, dominios, ...extra };
}

function tmpDir(prefijo = 'lector-web-') {
  return fs.mkdtempSync(path.join(os.tmpdir(), prefijo));
}

function rutaAuditoriaTmp() {
  return path.join(tmpDir(), 'logs', 'auditoria.jsonl');
}

function leerAuditoria(ruta) {
  if (!fs.existsSync(ruta)) return [];
  return fs.readFileSync(ruta, 'utf8').trim().split('\n').filter(Boolean).map((l) => JSON.parse(l));
}

// Resolutor DNS simulado: mapa host -> dirección (o lista de direcciones).
function resolverFijo(mapa) {
  const llamadas = [];
  const f = async (host) => {
    llamadas.push(host);
    const d = mapa[host];
    if (!d) {
      const e = new Error(`ENOTFOUND ${host}`);
      e.code = 'ENOTFOUND';
      throw e;
    }
    return (Array.isArray(d) ? d : [d]).map((address) => ({ address, family: address.includes(':') ? 6 : 4 }));
  };
  f.llamadas = llamadas;
  return f;
}

function respuesta({ estado = 200, tipo = 'text/html; charset=utf-8', cuerpo = '', cabeceras = {} } = {}) {
  const buf = Buffer.isBuffer(cuerpo) ? cuerpo : Buffer.from(cuerpo, 'utf8');
  const cab = { ...cabeceras };
  if (tipo) cab['content-type'] = tipo;
  return { estado, cabeceras: cab, cuerpo: buf, bytesRecibidos: buf.length };
}

// Función de petición simulada (modo "función de petición simulada").
function requestSimulado(manejador) {
  const llamadas = [];
  const f = async (ctx) => {
    llamadas.push(ctx.url.href);
    return manejador(ctx, llamadas.length);
  };
  f.llamadas = llamadas;
  return f;
}

const TEXTO_LARGO = 'Texto jurídico de prueba suficientemente largo para superar el umbral mínimo de contenido extraído. '.repeat(3);

function pagina(texto = TEXTO_LARGO) {
  return `<!doctype html><html><head><title>Prueba</title></head><body><nav>Menú de navegación</nav><main><h1>Título</h1><p>${texto}</p></main><footer>Pie de página</footer></body></html>`;
}

let certificado;
// Devuelve { key, cert } o null si openssl no está disponible.
function certificadoPrueba() {
  if (certificado !== undefined) return certificado;
  try {
    const dir = tmpDir('lector-cert-');
    const clave = path.join(dir, 'clave.pem');
    const cert = path.join(dir, 'cert.pem');
    execFileSync(
      'openssl',
      ['req', '-x509', '-newkey', 'rsa:2048', '-nodes', '-keyout', clave, '-out', cert, '-days', '2',
        '-config', path.join(__dirname, 'fixtures', 'openssl-prueba.cnf')],
      { stdio: 'ignore' }
    );
    certificado = { key: fs.readFileSync(clave), cert: fs.readFileSync(cert) };
  } catch {
    certificado = null;
  }
  return certificado;
}

// Servidor HTTPS local para probar el código real de red. Escucha en la dirección local.
function servidorHttps(manejador) {
  const c = certificadoPrueba();
  return new Promise((resolve) => {
    const peticiones = [];
    const srv = https.createServer({ key: c.key, cert: c.cert }, (req, res) => {
      peticiones.push({ url: req.url, cabeceras: req.headers });
      manejador(req, res, peticiones.length);
    });
    srv.listen(0, '127.0.0.1', () => {
      resolve({
        puerto: srv.address().port,
        cert: c.cert,
        peticiones,
        cerrar: () =>
          new Promise((r) => {
            if (srv.closeAllConnections) srv.closeAllConnections();
            srv.close(() => r());
          }),
      });
    });
  });
}

module.exports = {
  HOST, HOST2, HOST_INTERNO, IP_PUBLICA,
  dominio, configPrueba, tmpDir, rutaAuditoriaTmp, leerAuditoria,
  resolverFijo, respuesta, requestSimulado, TEXTO_LARGO, pagina,
  certificadoPrueba, servidorHttps,
};
