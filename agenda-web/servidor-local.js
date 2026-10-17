// Servidor de desarrollo sin dependencias. En Vercel, /api y /public se sirven solos.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const RAIZ = fileURLToPath(new URL('.', import.meta.url));
const TIPOS = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml' };
const RUTAS = new Set(['disponibilidad', 'reservar', 'confirmar']);

export function crearServidor() {
  return createServer(async (req, res) => {
    const url = new URL(req.url, 'http://x');
    res.status = (c) => { res.statusCode = c; return res; };
    res.json = (o) => { res.setHeader('content-type', 'application/json'); res.end(JSON.stringify(o)); };
    try {
      if (url.pathname.startsWith('/api/')) {
        const nombre = url.pathname.slice(5);
        if (!RUTAS.has(nombre)) return res.status(404).json({ error: 'No existe.' });
        req.query = Object.fromEntries(url.searchParams);
        let crudo = '';
        for await (const parte of req) crudo += parte;
        try { req.body = crudo ? JSON.parse(crudo) : {}; } catch { return res.status(400).json({ error: 'JSON inválido.' }); }
        const { default: handler } = await import(pathToFileURL(join(RAIZ, 'api', `${nombre}.js`)));
        return handler(req, res);
      }
      const ruta = url.pathname === '/' ? '/index.html' : url.pathname;
      const archivo = normalize(join(RAIZ, 'public', ruta));
      if (!archivo.startsWith(join(RAIZ, 'public'))) return res.status(403).end();
      const datos = await readFile(archivo);
      res.setHeader('content-type', TIPOS[extname(archivo)] || 'application/octet-stream');
      res.end(datos);
    } catch (e) {
      res.status(e.code === 'ENOENT' ? 404 : 500).end(e.code === 'ENOENT' ? 'No encontrado' : 'Error interno');
    }
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const puerto = Number(process.env.PORT) || 3000;
  crearServidor().listen(puerto, () => console.log(`http://localhost:${puerto}  (modo prueba: ${process.env.MODO_PRUEBA !== '0'})`));
}
