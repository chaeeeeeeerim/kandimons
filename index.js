// Servidor sem dependencias: serve /public e a API em /api/*
const http = require('http'), fs = require('fs'), path = require('path'), url = require('url');
const api = require('./mock-api.js');
const PUBLIC = path.join(__dirname, '..', 'public');
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'application/javascript', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.ico': 'image/x-icon', '.json': 'application/json' };
http.createServer((req, res) => {
  const u = url.parse(req.url, true);
  if (u.pathname.startsWith('/api/')) {
    const body = api.handle(u.pathname.slice(5), u.query);
    res.writeHead(body.success === false ? 404 : 200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
    return res.end(JSON.stringify(body));
  }
  let file = path.join(PUBLIC, decodeURIComponent(u.pathname));
  if (!file.startsWith(PUBLIC)) { res.writeHead(403); return res.end(); }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  if (!fs.existsSync(file)) file = path.join(PUBLIC, 'index.html'); // fallback p/ SPA
  res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
}).listen(process.env.PORT || 3000, () => console.log('Kandimons em http://localhost:' + (process.env.PORT || 3000)));
