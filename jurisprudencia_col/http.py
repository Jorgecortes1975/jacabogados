"""Capa HTTP compartida: User-Agent identificable, reintentos y errores claros."""
from __future__ import annotations

import time
from typing import Optional

import httpx

USER_AGENT = "JAC-Abogados-Jurisprudencia/0.1 (+investigacion juridica; contacto del despacho)"
TIMEOUT = 30.0
REINTENTOS = 3
CODIGOS_REINTENTABLES = {429, 500, 502, 503, 504}


class FuenteNoDisponible(Exception):
    """La fuente no pudo consultarse (red, DNS, proxy, HTTP no exitoso)."""


def nuevo_cliente(**kw) -> httpx.Client:
    kw.setdefault("headers", {"User-Agent": USER_AGENT, "Accept": "*/*"})
    kw.setdefault("timeout", TIMEOUT)
    kw.setdefault("follow_redirects", True)
    return httpx.Client(**kw)


def obtener(
    url: str,
    params: Optional[dict] = None,
    headers: Optional[dict] = None,
    cliente: Optional[httpx.Client] = None,
    reintentos: int = REINTENTOS,
    espera: float = 1.0,
) -> httpx.Response:
    """GET con reintentos y backoff exponencial para errores transitorios.

    Devuelve la respuesta tal cual (incluidos 404) para que el llamador decida;
    lanza FuenteNoDisponible solo ante fallos de red o agotamiento de reintentos.
    """
    propio = cliente is None
    cliente = cliente or nuevo_cliente()
    ultimo = "sin intentos"
    try:
        for intento in range(reintentos):
            try:
                r = cliente.get(url, params=params, headers=headers)
            except httpx.HTTPError as e:
                ultimo = f"{type(e).__name__}: {e}"
            else:
                if r.status_code not in CODIGOS_REINTENTABLES:
                    return r
                ultimo = f"HTTP {r.status_code}"
            if intento < reintentos - 1:
                time.sleep(espera * (2 ** intento))
        raise FuenteNoDisponible(f"{url} -> {ultimo}")
    finally:
        if propio:
            cliente.close()
