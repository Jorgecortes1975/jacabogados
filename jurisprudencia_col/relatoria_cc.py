"""Texto completo de sentencias de la Corte Constitucional (relatoría oficial)."""
from __future__ import annotations

import re
from html.parser import HTMLParser
from typing import Optional, Tuple

from .citas import urls_candidatas
from .http import obtener


class _Texto(HTMLParser):
    def __init__(self):
        super().__init__()
        self.partes, self._omitir = [], 0

    def handle_starttag(self, tag, attrs):
        if tag in ("script", "style"):
            self._omitir += 1
        elif tag in ("p", "br", "div", "tr", "li", "h1", "h2", "h3"):
            self.partes.append("\n")

    def handle_endtag(self, tag):
        if tag in ("script", "style") and self._omitir:
            self._omitir -= 1

    def handle_data(self, data):
        if not self._omitir:
            self.partes.append(data)


def decodificar(resp) -> str:
    """Las páginas antiguas de la relatoría pueden estar en cp1252/latin-1."""
    crudo = resp.content
    m = re.search(rb"charset=([\w-]+)", crudo[:2048], re.IGNORECASE)
    for enc in filter(None, [resp.charset_encoding, m and m.group(1).decode(), "utf-8", "cp1252"]):
        try:
            return crudo.decode(enc)
        except (UnicodeDecodeError, LookupError):
            continue
    return crudo.decode("latin-1", errors="replace")


def html_a_texto(html: str) -> str:
    p = _Texto()
    p.feed(html)
    texto = re.sub(r"[ \t\xa0]+", " ", "".join(p.partes))
    return re.sub(r"\n\s*\n+", "\n\n", texto).strip()


def descargar_texto(cita: str, cliente=None) -> Tuple[str, str]:
    """Devuelve (url_exitosa, texto). ("", "") si no hay cita válida; (url_primera, "")
    si ninguna variante de URL respondió 200 (verificar manualmente)."""
    urls = urls_candidatas(cita)
    if not urls:
        return "", ""
    for url in urls:
        r = obtener(url, cliente=cliente)
        if r.status_code == 200:
            return url, html_a_texto(decodificar(r))
    return urls[0], ""
