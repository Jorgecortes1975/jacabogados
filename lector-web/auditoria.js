'use strict';

// Bitácora de auditoría en formato JSON Lines (RF-015, D-12).
// Nunca registra el contenido leído. Puede contener direcciones que revelan el asunto consultado:
// es local, no se versiona (logs/ en .gitignore) y debe protegerse como información reservada.

const fs = require('node:fs');
const path = require('node:path');

// Oculta usuario y contraseña si la dirección los trae, para no guardar credenciales en la bitácora.
function limpiarUrl(texto) {
  if (typeof texto !== 'string') return null;
  return texto.replace(/\/\/[^/@\s]*@/g, '//***@').slice(0, 2048);
}

class Auditoria {
  constructor(ruta, ahora = () => new Date()) {
    this._ruta = ruta;
    this._ahora = ahora;
  }

  // Devuelve true si el registro se escribió; nunca lanza.
  registrar({ urlSolicitada, dominio = null, resultado, codigo = null, hashContenido = null, duracionMs = 0 }) {
    const linea = JSON.stringify({
      fecha: this._ahora().toISOString(),
      urlSolicitada: limpiarUrl(urlSolicitada),
      dominio,
      resultado,
      codigo,
      hashContenido,
      duracionMs,
    });
    try {
      fs.mkdirSync(path.dirname(this._ruta), { recursive: true, mode: 0o700 });
      fs.appendFileSync(this._ruta, `${linea}\n`, { mode: 0o600 });
      return true;
    } catch {
      return false;
    }
  }
}

module.exports = { Auditoria, limpiarUrl };
