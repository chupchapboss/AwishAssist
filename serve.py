import http.server
import socketserver
import base64
import sys

# --- CONFIGURATION ---
PORT = 8000
USERNAME = 'client'
PASSWORD = 'password123'
# ---------------------

key = base64.b64encode(bytes(f"{USERNAME}:{PASSWORD}", 'utf-8')).decode('ascii')

class AuthHandler(http.server.SimpleHTTPRequestHandler):
    def do_HEAD(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()

    def do_AUTHHEAD(self):
        self.send_response(401)
        self.send_header('WWW-Authenticate', 'Basic realm="Awish Innovations Demo"')
        self.send_header('Content-type', 'text/html')
        self.end_headers()

    def do_GET(self):
        auth_header = self.headers.get('Authorization')
        if auth_header == None:
            self.do_AUTHHEAD()
            self.wfile.write(b'Unauthorized')
            pass
        elif auth_header == 'Basic ' + key:
            http.server.SimpleHTTPRequestHandler.do_GET(self)
            pass
        else:
            self.do_AUTHHEAD()
            self.wfile.write(b'Unauthorized')
            pass

if __name__ == '__main__':
    Handler = AuthHandler
    try:
        with socketserver.TCPServer(("", PORT), Handler) as httpd:
            print(f"\n[+] Local Server running on http://localhost:{PORT}")
            print(f"[+] Password protection enabled. Username: {USERNAME} | Password: {PASSWORD}")
            print("\nTo share this, keep this terminal open and use a tunnel like localtunnel:")
            print("Open a new terminal and run: npx localtunnel --port 8000")
            httpd.serve_forever()
    except OSError as e:
        print(f"Error: {e}. Port {PORT} might be in use.")
