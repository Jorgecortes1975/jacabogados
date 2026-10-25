"""Verificación de una cita de norma. Devuelve el mismo formato que las demás citas."""
from __future__ import annotations

from datetime import date
from typing import Dict, Optional

from . import catalogo as cat_mod
from . import confirmaciones, gestor_normativo

FUENTE = "catalogo_funcion_publica"


def verificar(tipo: str, numero, anio: int, fecha_citada: str = "", fecha_ref: Optional[date] = None,
              catalogo: Optional[Dict] = None, cliente=None, en_vivo: bool = False,
              ruta_confirmaciones: Optional[str] = None) -> dict:
    fecha_ref = fecha_ref or date.today()
    catalogo = catalogo if catalogo is not None else cat_mod.cargar()
    clave = cat_mod.clave(tipo, numero, anio)
    n = cat_mod.buscar(catalogo, tipo, numero, anio)

    if n is None:
        otros = cat_mod.mismo_numero_otro_anio(catalogo, tipo, numero, anio)
        detalle = ("No figura en el catálogo. Su ausencia NO prueba que no exista: verificar en SUIN-Juriscol, "
                   "Diario Oficial o Gestor Normativo y registrarla con `python3 -m normas_col agregar`.")
        if otros:
            detalle += (" Atención: el catálogo registra " + ", ".join(o.titulo for o in otros)
                        + "; la numeración se reinicia cada año, confirmar que el año citado es el correcto.")
        return {"estado": "pendiente", "detalle": detalle, "fuentes": [], "url": "",
                "vigencia": {"estado": "no_determinada", "detalle": "norma no localizada"}}

    res = {"fuentes": [FUENTE], "url": n.url,
           "oficial": {"titulo": n.titulo, "expedida": n.expedida, "vigencia_desde": n.vigencia_desde,
                       "publicada_en": n.publicada_en, "id": n.id, "origen": n.origen}}

    if fecha_citada and n.expedida and fecha_citada != n.expedida:
        return {**res, "estado": "datos_discrepantes", "citado": {"fecha": fecha_citada},
                "detalle": f"Fecha citada {fecha_citada} no coincide con la oficial {n.expedida} ({n.titulo})",
                "vigencia": {"estado": "no_determinada", "detalle": "dato discrepante"}}

    notas = []
    if en_vivo:
        ok, det = gestor_normativo.confirmar_en_vivo(n, cliente)
        if ok:
            res["fuentes"].append("gestor_normativo_en_vivo")
        elif ok is None:
            notas.append("Confirmación en vivo no disponible: " + det)
        else:
            notas.append("Confirmación en vivo negativa: " + det)

    conf = confirmaciones.vigente(clave, fecha_ref, ruta_confirmaciones)
    conflictos = [m for m in n.modificaciones if m.startswith("CONFLICTO")]
    inexequibles = [m for m in n.modificaciones if "inexequ" in m.lower() and not m.startswith("CONFLICTO")]
    if conflictos:
        vig = {"estado": "conflicto_sin_resolver", "detalle": conflictos[0]}
    elif inexequibles:
        vig = {"estado": "inexequibilidad_registrada",
               "detalle": "El registro anota inexequibilidad: " + "; ".join(inexequibles[:3])
                          + ". No citar como vigente sin verificar la sentencia de la Corte Constitucional."}
    elif n.derogaciones:
        vig = {"estado": "derogacion_registrada",
               "detalle": "El registro anota derogación: " + "; ".join(n.derogaciones[:3]) + ". Puede ser parcial; confirmar el texto del artículo citado."}
    elif conf:
        vig = {"estado": "confirmada_manual",
               "detalle": f"Vigencia confirmada manualmente por {conf['por']} el {conf['fecha']} en {conf['fuente']}."}
    else:
        k = len(n.modificaciones)
        vig = {"estado": "no_determinada",
               "detalle": (f"Existencia confirmada; vigencia NO determinada ({k} modificaciones registradas, "
                           "listado no exhaustivo). Confirmar el texto vigente del artículo citado en fuente oficial.")}
    return {**res, "estado": "verificada", "vigencia": vig,
            "detalle": f"Existe: {n.titulo}, expedida {n.expedida or 'fecha no registrada'}"
                       + (f", {n.publicada_en}" if n.publicada_en else "") + "." + (" " + " ".join(notas) if notas else "")}
