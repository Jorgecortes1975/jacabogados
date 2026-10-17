// Pasarela Wompi. En modo de prueba no se contacta ninguna pasarela ni se cobra dinero.
import { createHash } from 'node:crypto';
import { config } from './config.js';

export function crearCheckout({ referencia, montoCOP, urlRetorno }) {
  if (config.modoPrueba) {
    return `/pago-prueba.html?ref=${encodeURIComponent(referencia)}`;
  }
  const centavos = montoCOP * 100;
  const firma = createHash('sha256')
    .update(`${referencia}${centavos}COP${process.env.WOMPI_INTEGRITY_SECRET || ''}`)
    .digest('hex');
  const p = new URLSearchParams({
    'public-key': process.env.WOMPI_PUBLIC_KEY || '',
    currency: 'COP',
    'amount-in-cents': String(centavos),
    reference: referencia,
    'signature:integrity': firma,
    'redirect-url': urlRetorno,
  });
  return `https://checkout.wompi.co/p/?${p}`;
}

// Nunca se confía en lo que diga el navegador: se consulta la transacción a la pasarela.
export async function verificarPago({ referencia, transaccionId, montoCOP }) {
  if (config.modoPrueba) {
    return { aprobado: transaccionId === 'prueba', estado: transaccionId === 'prueba' ? 'APPROVED' : 'DECLINED' };
  }
  if (!transaccionId) return { aprobado: false, estado: 'PENDING' }; // p. ej. se reabrió la página sin ?id=; lo confirma el aviso de la pasarela
  const base = process.env.WOMPI_API_URL || 'https://production.wompi.co/v1';
  const r = await fetch(`${base}/transactions/${encodeURIComponent(transaccionId)}`);
  if (r.status === 404) return { aprobado: false, estado: 'NO_ENCONTRADA' };
  if (!r.ok) throw new Error(`Wompi respondió ${r.status} al consultar la transacción`); // fallo temporal: no se presume nada
  const t = (await r.json()).data;
  if (!t) throw new Error('Wompi respondió sin datos de la transacción');
  const coincide = t.reference === referencia && t.amount_in_cents === montoCOP * 100 && t.currency === 'COP';
  return { aprobado: t.status === 'APPROVED' && coincide, estado: coincide ? t.status : 'NO_COINCIDE' };
}
