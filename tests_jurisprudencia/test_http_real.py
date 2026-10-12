"""La capa HTTP contra un servidor local real (sin salir a internet)."""
import http.server
import threading

import pytest

from jurisprudencia_col import http as H
from jurisprudencia_col import relatoria_cc, socrata_cc


class Manejador(http.server.BaseHTTPRequestHandler):
    def log_message(self, *a):
        pass

    def do_HEAD(self):
        self._resp(b"")

    def do_GET(self):
        self._resp(None)

    def _resp(self, forzar):
        if self.path.startswith("/json"):
            cuerpo, tipo, cod = b'[{"sentencia": "T-008/20"}]', "application/json", 200
            self.server.ultima = self.path
        elif self.path.startswith("/latin"):
            cuerpo, tipo, cod = "<p>sección</p>".encode("cp1252"), "text/html; charset=windows-1252", 200
        elif self.path.startswith("/503"):
            cuerpo, tipo, cod = b"", "text/plain", 503
        else:
            cuerpo, tipo, cod = b"no", "text/plain", 404
        self.send_response(cod)
        self.send_header("Content-Type", tipo)
        self.send_header("Content-Length", str(len(cuerpo)))
        self.end_headers()
        if self.command != "HEAD":
            self.wfile.write(cuerpo if forzar is None else forzar)


@pytest.fixture(scope="module")
def srv():
    s = http.server.HTTPServer(("127.0.0.1", 0), Manejador)
    threading.Thread(target=s.serve_forever, daemon=True).start()
    yield s, f"http://127.0.0.1:{s.server_port}"
    s.shutdown()


def test_get_json_y_parametros_codificados(srv):
    s, base = srv
    r = H.Cliente().get(base + "/json", params={"$q": "o'brien T-008/20", "$limit": 5})
    assert r.status_code == 200 and r.json()[0]["sentencia"] == "T-008/20"
    assert "%24q=o%27brien%20T-008%2F20" in s.ultima and "%24limit=5" in s.ultima


def test_head_404_y_decodificacion_cp1252(srv):
    _, base = srv
    c = H.Cliente()
    assert c.head(base + "/json").status_code == 200 and c.head(base + "/nada").status_code == 404
    assert relatoria_cc.estado_url(base + "/json", c) == 200
    assert "sección" in relatoria_cc.html_a_texto(relatoria_cc.decodificar(c.get(base + "/latin")))


def test_buscar_cc_contra_servidor_local(srv, monkeypatch):
    _, base = srv
    monkeypatch.setattr(socrata_cc, "BASE_URL", base + "/json")
    assert socrata_cc.buscar_cc("T-008/20", 5)[0].fuente_url.endswith("/2020/T-008-20.htm")


def test_reintenta_503_y_agota(srv, monkeypatch):
    _, base = srv
    monkeypatch.setattr("time.sleep", lambda s: None)
    with pytest.raises(H.FuenteNoDisponible, match="HTTP 503"):
        H.obtener(base + "/503")


def test_conexion_rechazada_es_fuente_no_disponible(monkeypatch):
    monkeypatch.setattr("time.sleep", lambda s: None)
    with pytest.raises(H.FuenteNoDisponible):
        H.obtener("http://127.0.0.1:1/", reintentos=2)
    with pytest.raises(H.ErrorRed):
        H.Cliente(timeout=2).get("http://127.0.0.1:1/")
