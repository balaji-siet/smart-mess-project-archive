const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const PORT = Number(process.env.PORT || 8090);
const HOST = process.env.HOST || '127.0.0.1';
const UPSTREAM_API_ORIGIN = 'https://bava-backend.onrender.com';
const siblingExportRoot = path.resolve(__dirname, '..', '..', 'SMART_MESS_OLD_UI_WEBSITE');
const root = path.resolve(
  process.env.WEB_ROOT ||
  (fs.existsSync(path.join(process.cwd(), 'index.html')) ? process.cwd() : '') ||
  (fs.existsSync(path.join(__dirname, 'index.html')) ? __dirname : '') ||
  siblingExportRoot
);

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.ico': 'image/x-icon',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
};

const proxyApiRequest = (req, res) => {
  const upstreamUrl = new URL(req.url, UPSTREAM_API_ORIGIN);
  const headers = { ...req.headers };

  delete headers.host;
  delete headers.origin;
  delete headers.referer;
  delete headers.connection;
  delete headers['accept-encoding'];

  const proxyReq = https.request(
    upstreamUrl,
    {
      method: req.method,
      headers,
    },
    (proxyRes) => {
      const responseHeaders = { ...proxyRes.headers };
      delete responseHeaders['content-encoding'];
      delete responseHeaders['transfer-encoding'];

      res.writeHead(proxyRes.statusCode || 502, {
        ...responseHeaders,
        'access-control-allow-origin': '*',
      });
      proxyRes.pipe(res);
    }
  );

  proxyReq.on('error', () => {
    res.writeHead(502, { 'content-type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ error: 'SMART MESS backend proxy unavailable' }));
  });

  req.pipe(proxyReq);
};

const serveStatic = (req, res) => {
  const cleanPath = decodeURIComponent((req.url || '/').split('?')[0]);
  let filePath = path.join(root, cleanPath === '/' ? 'index.html' : cleanPath);
  filePath = path.resolve(filePath);

  if (!filePath.startsWith(root)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.stat(filePath, (statError, stat) => {
    const resolvedFile = statError || !stat.isFile()
      ? path.join(root, 'index.html')
      : filePath;

    fs.readFile(resolvedFile, (readError, data) => {
      if (readError) {
        res.writeHead(404);
        res.end('Not found');
        return;
      }

      res.writeHead(200, {
        'content-type': MIME_TYPES[path.extname(resolvedFile).toLowerCase()] || 'application/octet-stream',
        'cache-control': 'no-store',
      });
      res.end(data);
    });
  });
};

const server = http.createServer((req, res) => {
  if ((req.url || '').startsWith('/api/')) {
    proxyApiRequest(req, res);
    return;
  }

  serveStatic(req, res);
});

server.listen(PORT, HOST, () => {
  console.log(`SMART MESS OLD UI WEB http://${HOST}:${PORT}/`);
  console.log(`Proxying /api/* to ${UPSTREAM_API_ORIGIN}/api/*`);
});
