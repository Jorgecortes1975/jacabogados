"""Capa HTTP compartida, solo con la biblioteca estándar (sin dependencias que instalar).

User-Agent identificable, reintentos con espera creciente y errores claros. Respeta las
variables de entorno de proxy (HTTPS_PROXY) y el almacén de certificados del sistema.
"""
from __future__ import annotations

import contextlib
import http.client
import json as _json
import re
import time
import urllib.error
import urllib.parse
import urllib.request
from typing import Dict, Iterator, Optional

USER_AGENT = "JAC-Abogados-Jurisprudencia/0.2 (+investigacion juridica; contacto del despacho)"
TIMEOUT = 30.0
REINTENTOS = 3
CODIGOS_REINTENTABLES = {429, 500, 502, 503, 504}


class FuenteNoDisponible(Exception):
    """La fuente no pudo consultarse (red, DNS, proxy, HTTP no exitoso)."""


class ErrorRed(OSError):
    """Fallo de red, DNS, proxy, TLS o tiempo de espera."""


class ErrorHTTP(OSError):
    """Respuesta HTTP no exitosa cuando el llamador exige éxito."""


class Respuesta:
    def __init__(self, status_code: int, content: bytes = b"", headers: Optional[Dict[str, str]] = None, url: str = ""):
        self.status_code, self.content, self.url = status_code, content, url
        self.headers = {k.lower(): v for k, v in (headers or {}).items()}

    @property
    def charset_encoding(self) -> Optional[str]:
        m = re.search(r"charset=([\w-]+)", self.headers.get("content-type", ""), re.IGNORECASE)
        return m.group(1) if m else None

    @property
    def text(self) -> str:
        for enc in filter(None, [self.charset_encoding, "utf-8"]):
            try:
                return self.content.decode(enc)
            except (UnicodeDecodeError, LookupError):
                continue
        return self.content.decode("latin-1", errors="replace")

    def json(self):
        return _json.loads(self.text)

    def raise_for_status(self) -> None:
        if self.status_code >= 400:
            raise ErrorHTTP(f"HTTP {self.status_code} en {self.url}")


class Cliente:
    def __init__(self, timeout: float = TIMEOUT, headers: Optional[Dict[str, str]] = None):
        self.timeout = timeout
        self.headers = {"User-Agent": USER_AGENT, "Accept": "*/*", **(headers or {})}

    def _pedir(self, metodo: str, url: str, params=None, headers=None, cuerpo: bool = True) -> Respuesta:
        if params:
            url += ("&" if "?" in url else "?") + urllib.parse.urlencode(params, quote_via=urllib.parse.quote)
        req = urllib.request.Request(url, method=metodo, headers={**self.headers, **(headers or {})})
        try:
            with urllib.request.urlopen(req, timeout=self.timeout) as r:
                return Respuesta(r.status, r.read() if cuerpo else b"", dict(r.headers), url)
        except urllib.error.HTTPError as e:
            return Respuesta(e.code, e.read() if cuerpo else b"", dict(e.headers or {}), url)
        except (urllib.error.URLError, OSError, http.client.HTTPException) as e:
            raise ErrorRed(f"{type(e).__name__}: {getattr(e, 'reason', e)}") from e

    def get(self, url, params=None, headers=None) -> Respuesta:
        return self._pedir("GET", url, params, headers)

    def head(self, url, headers=None) -> Respuesta:
        return self._pedir("HEAD", url, None, headers, cuerpo=False)

    @contextlib.contextmanager
    def stream(self, metodo: str, url: str) -> Iterator[Respuesta]:
        """Solo estado y cabeceras: no descarga el cuerpo."""
        yield self._pedir(metodo, url, cuerpo=False)

    def close(self) -> None:
        pass


def nuevo_cliente(**kw) -> Cliente:
    return Cliente(**kw)


def obtener(url: str, params: Optional[dict] = None, headers: Optional[dict] = None,
            cliente=None, reintentos: int = REINTENTOS, espera: float = 1.0) -> Respuesta:
    """GET con reintentos y espera exponencial para errores transitorios.

    Devuelve la respuesta tal cual (incluidos 404) para que el llamador decida;
    lanza FuenteNoDisponible solo ante fallos de red o agotamiento de reintentos.
    """
    cliente = cliente or nuevo_cliente()
    ultimo = "sin intentos"
    for intento in range(reintentos):
        try:
            r = cliente.get(url, params=params, headers=headers)
        except OSError as e:
            ultimo = f"{type(e).__name__}: {e}"
        else:
            if r.status_code not in CODIGOS_REINTENTABLES:
                return r
            ultimo = f"HTTP {r.status_code}"
        if intento < reintentos - 1:
            time.sleep(espera * (2 ** intento))
    raise FuenteNoDisponible(f"{url} -> {ultimo}")
