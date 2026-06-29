#!/usr/bin/env python3
"""
API REST de solo lectura — JA Abogados CRM
Sirve los prospectos del CRM como JSON paginado.

Uso local:
    pip3 install fastapi uvicorn
    python3 api_prospectos.py

Documentación automática (mientras corre):
    http://localhost:8000/docs
"""

import json
import time
from collections import defaultdict
from pathlib import Path
from typing import Optional

from fastapi import FastAPI, HTTPException, Query, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

# ── Cargar configuración ──────────────────────────────────────────────────────

CONFIG_PATH = Path(__file__).parent / "endpoint.config.json"

if not CONFIG_PATH.exists():
    raise RuntimeError("No se encontró endpoint.config.json — ejecútalo desde la carpeta del proyecto.")

with open(CONFIG_PATH, encoding="utf-8") as f:
    CONFIG = json.load(f)

if CONFIG.get("endpoint_url") == "EDITAR_AQUÍ":
    print("⚠️  AVISO: endpoint_url en endpoint.config.json aún dice 'EDITAR_AQUÍ'.")
    print("    Edítalo con la URL pública cuando despliegues (ej: https://tu-dominio.com).")
    print("    La API funciona igual en local — este aviso es solo informativo.\n")

ALLOWED_COLS   = set(CONFIG["allowed_columns"])
RATE_LIMIT     = CONFIG["rate_limit_per_minute"]
MAX_PAGE_SIZE  = CONFIG["max_page_size"]
MAX_OFFSET     = CONFIG["max_offset"]
CORS_ORIGINS   = CONFIG["cors_origins"]
API_TITLE      = CONFIG["api_title"]
API_VERSION    = CONFIG["api_version"]

# ── Importar datos desde generar_crm.py ──────────────────────────────────────

from generar_crm import PROSPECTOS

def _semaforo_texto(total: int) -> str:
    if total >= 33: return "VERDE"
    if total >= 24: return "AMARILLO"
    if total >= 15: return "NARANJA"
    return "ROJO"

def _build_registro(idx: int, p: tuple) -> dict:
    total = sum(p[9:17])
    raw = {
        "id":            idx + 1,
        "empresa":       p[0],
        "sector":        p[1],
        "senal":         p[2],
        "decisor":       p[3],
        "cargo":         p[4],
        "servicio":      p[8],
        "c1":            p[9],
        "c2":            p[10],
        "c3":            p[11],
        "c4":            p[12],
        "c5":            p[13],
        "c6":            p[14],
        "c7":            p[15],
        "c8":            p[16],
        "total":         total,
        "semaforo":      _semaforo_texto(total),
        "estado":        p[17],
        "proxima_accion": p[18],
    }
    return {k: v for k, v in raw.items() if k in ALLOWED_COLS or k == "id"}

REGISTROS = [_build_registro(i, p) for i, p in enumerate(PROSPECTOS)]

# ── Rate limiter en memoria (sin Redis) ──────────────────────────────────────

_ventana: dict[str, list[float]] = defaultdict(list)

def _check_rate_limit(ip: str) -> bool:
    ahora = time.time()
    ventana = _ventana[ip]
    # Mantener solo los timestamps del último minuto
    _ventana[ip] = [t for t in ventana if ahora - t < 60]
    if len(_ventana[ip]) >= RATE_LIMIT:
        return False
    _ventana[ip].append(ahora)
    return True

# ── Aplicación ────────────────────────────────────────────────────────────────

app = FastAPI(
    title=API_TITLE,
    version=API_VERSION,
    description=(
        "API de **solo lectura** del CRM de prospectos de JA Abogados. "
        "Los campos de contacto (email, teléfono, LinkedIn) están excluidos "
        "de acuerdo con la Ley 1581/2012 (Habeas Data)."
    ),
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_methods=["GET"],
    allow_headers=["*"],
)

# ── Middleware de rate limit ──────────────────────────────────────────────────

@app.middleware("http")
async def rate_limit_middleware(request: Request, call_next):
    ip = request.client.host if request.client else "unknown"
    if not _check_rate_limit(ip):
        return JSONResponse(
            status_code=429,
            content={
                "error": "Demasiadas solicitudes.",
                "detalle": f"Límite: {RATE_LIMIT} requests por minuto.",
                "reintenta_en": "60 segundos",
            },
        )
    return await call_next(request)

# ── Endpoints ─────────────────────────────────────────────────────────────────

@app.get("/health", tags=["Sistema"], summary="Estado del servicio")
def health():
    return {
        "status": "ok",
        "version": API_VERSION,
        "total_prospectos": len(REGISTROS),
        "endpoint_url": CONFIG.get("endpoint_url"),
    }


@app.get(
    "/prospectos",
    tags=["Prospectos"],
    summary="Listado paginado de prospectos (solo lectura)",
)
def listar_prospectos(
    page: int = Query(1, ge=1, description="Número de página (empieza en 1)"),
    page_size: int = Query(10, ge=1, le=MAX_PAGE_SIZE, description=f"Registros por página (máx. {MAX_PAGE_SIZE})"),
    sector: Optional[str] = Query(None, description="Filtrar por sector (parcial, sin distinción de mayúsculas)"),
    semaforo: Optional[str] = Query(None, description="Filtrar por semáforo: VERDE | AMARILLO | NARANJA | ROJO"),
    estado: Optional[str] = Query(None, description="Filtrar por estado del prospecto"),
):
    datos = REGISTROS

    # Filtros opcionales
    if sector:
        datos = [r for r in datos if sector.lower() in r["sector"].lower()]
    if semaforo:
        datos = [r for r in datos if r["semaforo"].upper() == semaforo.upper()]
    if estado:
        datos = [r for r in datos if estado.lower() in r["estado"].lower()]

    total_filtrado = len(datos)
    offset = (page - 1) * page_size

    # Tope de offset para evitar scraping masivo
    if offset > MAX_OFFSET:
        raise HTTPException(
            status_code=400,
            detail=f"Offset máximo permitido: {MAX_OFFSET}. Ajusta 'page' y 'page_size'.",
        )

    pagina = datos[offset: offset + page_size]

    return {
        "total":      total_filtrado,
        "page":       page,
        "page_size":  page_size,
        "pages":      max(1, -(-total_filtrado // page_size)),  # ceil division
        "results":    pagina,
    }


@app.get(
    "/prospectos/{prospecto_id}",
    tags=["Prospectos"],
    summary="Detalle de un prospecto por ID",
)
def obtener_prospecto(prospecto_id: int):
    if prospecto_id < 1 or prospecto_id > len(REGISTROS):
        raise HTTPException(status_code=404, detail=f"Prospecto {prospecto_id} no encontrado.")
    return REGISTROS[prospecto_id - 1]


# ── Arranque ──────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    import uvicorn

    print("=" * 56)
    print(f"  {API_TITLE}")
    print(f"  Versión {API_VERSION}")
    print("=" * 56)
    print(f"  Prospectos cargados : {len(REGISTROS)}")
    print(f"  Rate limit          : {RATE_LIMIT} req/min por IP")
    print(f"  Página máxima       : {MAX_PAGE_SIZE} registros")
    print(f"  Documentación       : http://localhost:8000/docs")
    print(f"  Endpoint salud      : http://localhost:8000/health")
    print(f"  Prospectos (JSON)   : http://localhost:8000/prospectos")
    print("=" * 56)

    uvicorn.run("api_prospectos:app", host="0.0.0.0", port=8000, reload=True)
