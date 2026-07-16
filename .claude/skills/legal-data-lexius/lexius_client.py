#!/usr/bin/env python3
"""
LEXIUS COLOMBIA CLIENT — Acceso seguro a appcolombia.lexius.io
Módulo de autenticación, búsqueda y extracción de datos legales
"""

import os
import json
import logging
from datetime import datetime
from typing import Optional, Dict, List, Literal
from dataclasses import dataclass
from dotenv import load_dotenv
import requests
from requests.auth import HTTPBasicAuth
from pathlib import Path

# Cargar variables de entorno desde .env.local en raíz del proyecto
env_path = Path(__file__).parent.parent.parent / '.env.local'
if env_path.exists():
    load_dotenv(env_path)
else:
    # Fallback: intentar desde cwd
    load_dotenv('.env.local')

# Configuración logging
logging.basicConfig(
    level=os.getenv('LEXIUS_LOG_LEVEL', 'INFO'),
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@dataclass
class LexiusConfig:
    """Configuración del cliente Lexius"""
    user: str
    password: str
    base_url: str
    cache_dir: str
    cache_validity_days: int

    @classmethod
    def from_env(cls):
        """Carga configuración desde variables de entorno"""
        required = ['LEXIUS_USER', 'LEXIUS_PASS', 'LEXIUS_BASE_URL']
        missing = [v for v in required if not os.getenv(v)]

        if missing:
            raise ValueError(f"Variables de entorno faltantes: {missing}")

        return cls(
            user=os.getenv('LEXIUS_USER'),
            password=os.getenv('LEXIUS_PASS'),
            base_url=os.getenv('LEXIUS_BASE_URL'),
            cache_dir=os.getenv('LEXIUS_CACHE_DIR', '/tmp/lexius-cache'),
            cache_validity_days=int(os.getenv('LEXIUS_CACHE_VALIDITY_DAYS', '30'))
        )


@dataclass
class LexiusSearchResult:
    """Resultado de búsqueda en Lexius"""
    tipo: Literal['NORMA', 'JURISPRUDENCIA', 'ANALISIS', 'FORMATO', 'CAMBIO']
    titulo: str
    contenido: str
    confianza: Literal['ALTA', 'MEDIA', 'BAJA']
    fecha_vigencia: str
    url_fuente: str
    cambios_recientes: Optional[List[str]] = None
    riesgos: Optional[List[str]] = None
    jurisprudencia_relacionada: Optional[List[Dict]] = None


class LexiusClient:
    """Cliente para acceso seguro a appcolombia.lexius.io"""

    def __init__(self, config: Optional[LexiusConfig] = None):
        self.config = config or LexiusConfig.from_env()
        self.session = None
        self._authenticated = False

    def authenticate(self) -> bool:
        """Autentica con Lexius (Guardia 1: Autenticación)"""
        try:
            logger.info("Iniciando autenticación con Lexius...")
            self.session = requests.Session()

            # Intento de login
            auth_url = f"{self.config.base_url}/api/auth/login"
            response = self.session.post(
                auth_url,
                json={
                    'email': self.config.user,
                    'password': self.config.password
                },
                timeout=10
            )

            if response.status_code == 200:
                self._authenticated = True
                logger.info(f"✅ Autenticación exitosa: {self.config.user}")
                return True
            else:
                logger.error(f"❌ Fallo autenticación (HTTP {response.status_code})")
                return False

        except requests.exceptions.RequestException as e:
            logger.error(f"❌ Error conexión Lexius: {e}")
            return False

    def search(
        self,
        query: str,
        search_type: Literal['NORMA', 'JURISPRUDENCIA', 'ANALISIS', 'FORMATO', 'CAMBIO'] = 'NORMA',
        jurisdiction: str = 'Colombia'
    ) -> Optional[LexiusSearchResult]:
        """
        Busca en Lexius Colombia
        Guardia 2: Clasificación tipo búsqueda
        Guardia 3: Sin resultados
        """
        if not self._authenticated:
            logger.error("❌ No autenticado. Ejecuta authenticate() primero")
            return None

        try:
            logger.info(f"Buscando {search_type}: {query}")

            search_url = f"{self.config.base_url}/api/search"
            response = self.session.get(
                search_url,
                params={
                    'q': query,
                    'type': search_type,
                    'jurisdiction': jurisdiction
                },
                timeout=15
            )

            if response.status_code == 200:
                data = response.json()

                if not data.get('results'):
                    logger.warning(f"⚠️ Sin resultados para: {query}")
                    return None

                # Parse resultado
                result = self._parse_result(data['results'][0], search_type)
                logger.info(f"✅ Resultado encontrado: {result.titulo}")
                return result
            else:
                logger.error(f"❌ Búsqueda fallida (HTTP {response.status_code})")
                return None

        except Exception as e:
            logger.error(f"❌ Error búsqueda: {e}")
            return None

    def _parse_result(self, raw_result: Dict, search_type: str) -> LexiusSearchResult:
        """Parse resultado de Lexius a estructura estándar"""
        return LexiusSearchResult(
            tipo=search_type,
            titulo=raw_result.get('titulo', 'Sin título'),
            contenido=raw_result.get('contenido', ''),
            confianza=self._determine_confidence(raw_result),
            fecha_vigencia=raw_result.get('fecha_vigencia', ''),
            url_fuente=raw_result.get('url', f"{self.config.base_url}/document/"),
            cambios_recientes=raw_result.get('cambios_recientes', []),
            riesgos=raw_result.get('riesgos_identificados', []),
            jurisprudencia_relacionada=raw_result.get('jurisprudencia', [])
        )

    def _determine_confidence(self, result: Dict) -> str:
        """Guardia 5: Determina nivel de confianza ALTA/MEDIA/BAJA"""
        is_official = result.get('es_oficial', False)
        is_recent = result.get('fecha_vigencia', '1900') >= '2020'
        has_verification = result.get('verificado_lexius', False)

        if is_official and has_verification and is_recent:
            return 'ALTA'
        elif has_verification and is_recent:
            return 'MEDIA'
        else:
            return 'BAJA'

    def validate_vigencia(self, norma_title: str) -> Dict:
        """Guardia 4: Valida vigencia de norma (no derogada/modificada)"""
        try:
            url = f"{self.config.base_url}/api/norma/vigencia"
            response = self.session.get(
                url,
                params={'norma': norma_title},
                timeout=10
            )

            if response.status_code == 200:
                data = response.json()
                return {
                    'vigente': data.get('vigente', False),
                    'derogada': data.get('derogada', False),
                    'modificada': data.get('modificaciones', []),
                    'fecha_ultima_actualizacion': data.get('ultima_actualizacion', '')
                }
        except Exception as e:
            logger.error(f"❌ Error validación vigencia: {e}")

        return {'vigente': None, 'error': 'No se pudo verificar'}

    def close(self):
        """Cierra sesión de forma segura"""
        if self.session:
            try:
                self.session.close()
                logger.info("✅ Sesión Lexius cerrada")
            except:
                pass

    def __enter__(self):
        return self

    def __exit__(self, *args):
        self.close()


# Función de prueba
if __name__ == '__main__':
    try:
        client = LexiusClient()

        # Test autenticación
        if not client.authenticate():
            print("❌ Autenticación fallida")
            exit(1)

        # Test búsqueda
        result = client.search('Código Sustantivo del Trabajo', search_type='NORMA')
        if result:
            print(f"✅ Encontrado: {result.titulo}")
            print(f"   Confianza: {result.confianza}")
            print(f"   URL: {result.url_fuente}")

        client.close()

    except Exception as e:
        print(f"❌ Error: {e}")
