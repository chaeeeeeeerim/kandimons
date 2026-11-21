# Servidor em Python (sem dependencias): serve /public e a API de demonstracao em /api/*
# Uso: python server.py [porta]
import json, os, re, sys, mimetypes
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from urllib.parse import urlparse, parse_qs

BASE = os.path.dirname(os.path.abspath(__file__))
PUBLIC = os.path.join(BASE, 'public')
mimetypes.add_type('image/webp', '.webp')
mimetypes.add_type('application/javascript', '.js')

src = open(os.path.join(BASE, 'server', 'mock-api.js'), encoding='utf-8').read()
DATA = json.loads(re.search(r'var DATA=(\{.*?\});\s*var PLACEHOLDER=', src, re.S).group(1))
PLACEHOLDER = json.loads(re.search(r'var PLACEHOLDER=(".*?");\s*function', src, re.S).group(1))

def handle(path, q):
    path = path.strip('/')
    s = (q.get('searchstring', [''])[0]).strip().lower()
    if path == 'items/v3/itemdetails':
        return {'success': True, 'item_count': len(DATA['assets']), 'assets': DATA['assets'], 'bundles': DATA['bundles']}
    if path == 'itemthumbs/v2/thumbssm':
        return {'assets': {k: PLACEHOLDER for k in DATA['assets']}, 'bundles': {k: PLACEHOLDER for k in DATA['bundles']}}
    if path == 'players/v1/playersearch':
        p = [x for x in DATA['players'] if s in x[1].lower()]
        return {'success': True, 'result_count': len(p), 'players': p}
    if path == 'groups/v1/groupsearch':
        g = [x for x in DATA['groups'] if s in x[1].lower()]
        return {'success': True, 'result_count': len(g), 'groups': g}
    if path == 'games/v1/gamelist':
        return {'success': True, 'games': DATA['games']}
    if path == 'auth/v1/logout':
        return {'success': True}
    return {'success': False, 'error': 'not_found'}

class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *a, **k):
        super().__init__(*a, directory=PUBLIC, **k)
    def do_GET(self):
        u = urlparse(self.path)
        if u.path.startswith('/api/'):
            body = handle(u.path[5:], parse_qs(u.query))
            raw = json.dumps(body).encode()
            self.send_response(200 if body.get('success') is not False else 404)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Cache-Control', 'no-store')
            self.send_header('Content-Length', str(len(raw)))
            self.end_headers()
            self.wfile.write(raw)
            return
        super().do_GET()
    def log_message(self, *a):
        pass

if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else int(os.environ.get('PORT', 3000))
    print('Kandimons em http://localhost:%d  (Ctrl+C para parar)' % port)
    ThreadingHTTPServer(('0.0.0.0', port), Handler).serve_forever()
