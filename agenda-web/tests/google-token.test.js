import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn, spawnSync } from 'node:child_process';

const script = new URL('../scripts/google-token.js', import.meta.url).pathname;

test('sin credenciales explica qué falta y termina', () => {
  const r = spawnSync(process.execPath, [script], { env: { PATH: process.env.PATH }, encoding: 'utf8' });
  assert.equal(r.status, 1);
  assert.match(r.stderr, /GOOGLE_CLIENT_ID/);
});

test('entrega una dirección de Google válida y rechaza respuestas con estado falso', async () => {
  const puerto = 18765;
  const hijo = spawn(process.execPath, [script], { env: { PATH: process.env.PATH, GOOGLE_CLIENT_ID: 'cid', GOOGLE_CLIENT_SECRET: 's', PUERTO_TOKEN: String(puerto) } });
  try {
    let salida = '';
    await new Promise((ok) => hijo.stdout.on('data', (d) => { salida += d; if (salida.includes('Esperando')) ok(); }));
    const url = new URL(salida.match(/https:\/\/accounts\.google\.com\S+/)[0]);
    assert.equal(url.searchParams.get('client_id'), 'cid');
    assert.equal(url.searchParams.get('access_type'), 'offline');
    assert.equal(url.searchParams.get('redirect_uri'), `http://localhost:${puerto}`);
    assert.equal((await fetch(`http://localhost:${puerto}/?code=x&state=falso`)).status, 400);
  } finally { hijo.kill(); }
});
