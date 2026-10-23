const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const root = __dirname;
const types = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
};

const server = http.createServer((req, res) => {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  } catch {
    res.writeHead(400).end('Bad request');
    return;
  }

  const requested = path.resolve(root, `.${pathname}`);
  if (requested !== root && !requested.startsWith(`${root}${path.sep}`)) {
    res.writeHead(403).end('Forbidden');
    return;
  }

  const file = pathname.endsWith('/') ? path.join(requested, 'index.html') : requested;
  fs.readFile(file, (error, contents) => {
    if (error) {
      res.writeHead(error.code === 'ENOENT' ? 404 : 500).end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': types[path.extname(file).toLowerCase()] || 'application/octet-stream' });
    res.end(contents);
  });
});

const port = Number(process.env.PORT) || 4173;
server.listen(port, '127.0.0.1', () => {
  console.log(`Califnco is running at http://127.0.0.1:${port}`);
});
