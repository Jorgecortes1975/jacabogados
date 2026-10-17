export const origen = (req) =>
  process.env.SITIO_URL?.replace(/\/$/, '') ||
  `${req.headers['x-forwarded-proto'] || 'http'}://${req.headers.host}`;

export const enviar = (res, codigo, cuerpo) => res.status(codigo).json(cuerpo);
