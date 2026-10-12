"""Verificación de citas contra fuentes oficiales, con tolerancia a fuentes caídas.

Estados: verificada | no_encontrada | datos_discrepantes | pendiente.
"no_encontrada" solo se emite cuando las fuentes RESPONDIERON y ninguna conoce la
cita; si una fuente no responde, la cita queda "pendiente" (nunca se presume).
"""
from __future__ import annotations

from typing import Dict, List, Optional

import httpx

from jurisprudencia_col import relatoria_cc, socrata_cc
from jurisprudencia_col.citas import parsear_cita, urls_candidatas
from jurisprudencia_col.http import FuenteNoDisponible

from .extractor import Cita, ponente_en_contexto, sin_acentos


def _tokens(nombre: str) -> set:
    return {t for t in sin_acentos(nombre).upper().replace(".", " ").split() if len(t) >= 3}


class Verificador:
    def __init__(self, cliente: Optional[httpx.Client] = None, sin_red: bool = False):
        self.cliente, self.sin_red = cliente, sin_red
        self.fuentes: Dict[str, dict] = {}   # fuente -> {estado, detalle}
        self._cache: Dict[str, dict] = {}

    def _anotar(self, fuente: str, estado: str, detalle: str = "") -> None:
        previo = self.fuentes.get(fuente)
        if not previo or estado != "ok":      # un fallo no se sobrescribe con éxito posterior
            self.fuentes[fuente] = {"estado": estado, "detalle": detalle}

    def _caida(self, fuente: str) -> bool:
        return self.fuentes.get(fuente, {}).get("estado") == "caida"

    def _socrata(self, canonica: str):
        if self._caida("socrata_cc"):
            return None, "fuente no disponible en esta ejecución"
        try:
            for s in socrata_cc.buscar_cc(canonica, 20, cliente=self.cliente):
                p = parsear_cita(s.sentencia)
                if p and p.canonica == canonica:
                    self._anotar("socrata_cc", "ok")
                    return s, ""
            self._anotar("socrata_cc", "ok")
            return False, ""
        except (FuenteNoDisponible, httpx.HTTPError, ValueError) as e:
            self._anotar("socrata_cc", "caida", str(e))
            return None, str(e)

    def _relatoria(self, cita: str):
        if self._caida("relatoria_cc"):
            return None, None, "fuente no disponible en esta ejecución"
        vistas404 = 0
        urls = urls_candidatas(cita)
        try:
            for u in urls:
                codigo = relatoria_cc.estado_url(u, self.cliente)
                if codigo == 200:
                    self._anotar("relatoria_cc", "ok")
                    return u, True, ""
                if codigo == 404:
                    vistas404 += 1
                else:
                    raise FuenteNoDisponible(f"{u} -> HTTP {codigo}")
        except (FuenteNoDisponible, httpx.HTTPError) as e:
            self._anotar("relatoria_cc", "caida", str(e))
            return None, None, str(e)
        self._anotar("relatoria_cc", "ok")
        return urls[0] if urls else None, (False if vistas404 == len(urls) and urls else None), ""

    def cc(self, c: Cita) -> dict:
        if c.problema:
            return {"estado": "no_encontrada", "detalle": c.problema, "fuentes": [], "url": ""}
        if self.sin_red:
            return {"estado": "pendiente", "detalle": "verificación en red omitida (--sin-red)", "fuentes": [], "url": ""}
        if c.clave not in self._cache:
            self._cache[c.clave] = self._resolver_cc(c.clave)
        base = dict(self._cache[c.clave])
        ponente = ponente_en_contexto(c.contexto)
        oficial = base.get("oficial") or {}
        if base["estado"] == "verificada" and ponente and oficial.get("magistrado"):
            if not (_tokens(ponente) & _tokens(oficial["magistrado"])):
                base.update(estado="datos_discrepantes", citado={"ponente": ponente},
                            detalle=f"Ponente citado '{ponente}' no coincide con el oficial '{oficial['magistrado']}'")
        return base

    def _resolver_cc(self, canonica: str) -> dict:
        s, err_s = self._socrata(canonica)
        url, rel, err_r = self._relatoria(canonica)
        fuentes: List[str] = []
        if s:
            fuentes.append("socrata_cc")
        if rel:
            fuentes.append("relatoria_cc")
        oficial = {"magistrado": s.magistrado, "fecha": s.fecha[:10], "expediente": s.expediente} if s else None
        res = {"url": url or "", "fuentes": fuentes, "oficial": oficial}
        if fuentes:
            nota = ""
            if s is False or rel is False:
                nota = " Las fuentes no coinciden entre sí; confirmar manualmente."
            return {**res, "estado": "verificada", "detalle": "Confirmada por " + ", ".join(fuentes) + "." + nota}
        if s is False and rel is False:
            return {**res, "estado": "no_encontrada",
                    "detalle": "Socrata y relatoría respondieron y ninguna conoce la cita."}
        motivos = "; ".join(m for m in (err_s, err_r) if m) or "respuesta no concluyente de las fuentes"
        return {**res, "estado": "pendiente", "detalle": "Fuente no concluyente: " + motivos}

    def otra(self, c: Cita) -> dict:
        if c.problema:
            return {"estado": "no_encontrada", "detalle": c.problema, "fuentes": [], "url": ""}
        destino = ("Corte Suprema de Justicia (relatoría oficial)" if c.clase == "cs"
                   else "SUIN-Juriscol / Diario Oficial / Secretaría del Senado")
        return {"estado": "pendiente", "fuentes": [], "url": "",
                "detalle": f"Sin conector automático; verificar existencia y vigencia en {destino}."}
