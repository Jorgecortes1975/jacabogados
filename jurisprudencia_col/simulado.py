"""Cliente HTTP simulado para pruebas y ensayos sin red (misma interfaz que http.Cliente)."""
from __future__ import annotations

import json as _json
import urllib.parse
from typing import Callable, Optional

from .http import Respuesta


class URL(str):
    @property
    def path(self) -> str:
        return urllib.parse.urlsplit(self).path

    @property
    def params(self) -> dict:
        return {k: v[0] for k, v in urllib.parse.parse_qs(urllib.parse.urlsplit(self).query, keep_blank_values=True).items()}


class Peticion:
    def __init__(self, metodo: str, url: str, headers: Optional[dict] = None):
        self.method, self.url, self.headers = metodo, URL(url), headers or {}


class Resp(Respuesta):
    def __init__(self, status_code: int = 200, json=None, text: Optional[str] = None,
                 content: Optional[bytes] = None, headers: Optional[dict] = None):
        if content is None:
            content = (_json.dumps(json) if json is not None else (text or "")).encode("utf-8")
        super().__init__(status_code, content, headers)


class ClienteSimulado:
    def __init__(self, handler: Callable[[Peticion], Respuesta]):
        self.handler = handler

    def _url(self, url, params):
        return url + (("&" if "?" in url else "?") + urllib.parse.urlencode(params, quote_via=urllib.parse.quote) if params else "")

    def get(self, url, params=None, headers=None):
        return self.handler(Peticion("GET", self._url(url, params), headers))

    def head(self, url, headers=None):
        return self.handler(Peticion("HEAD", url, headers))

    def stream(self, metodo, url):
        import contextlib

        @contextlib.contextmanager
        def _cm():
            yield self.handler(Peticion(metodo, url))
        return _cm()

    def close(self):
        pass
