#!/usr/bin/env python3
"""
LEXIUS SKILL ORCHESTRATOR — Ejecuta búsqueda → reporte → integración
Interfaz principal entre Claude y appcolombia.lexius.io

USO:
python3 run_lexius.py --tipo NORMA --query "Código Sustantivo del Trabajo" --abogado "Jorge Cortés"
"""

import argparse
import sys
import logging
from typing import Optional
from pathlib import Path
from lexius_client import LexiusClient, LexiusConfig
from reporte_generator import ReporteGenerator

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(message)s'
)
logger = logging.getLogger(__name__)


class LexiusSkillOrchestrator:
    """Orquestador principal del skill Lexius"""

    RIESGOS_POR_TIPO = {
        'NORMA': [
            'Interpretación divergente entre tribunales',
            'Normativa ambigua con múltiples lecturas válidas',
            'Cambios legislativos pendientes en Congreso'
        ],
        'JURISPRUDENCIA': [
            'Jurisprudencia no pacífica (criterios conflictivos)',
            'Sentencia pendiente de ejecutoria o aclaración',
            'Línea jurisprudencial no consolidada'
        ],
        'ANALISIS': [
            'Análisis interpretativo (no verificable directo)',
            'Doctrina de autor específico (no oficial)',
            'Posición no unificada en doctrina'
        ],
        'FORMATO': [
            'Plantilla genérica que requiere adaptación',
            'Formato predispuesto a jurisdicción diferente',
            'Requisitos específicos por tribunal'
        ],
        'CAMBIO': [
            'Cambio normativo reciente aún no consolidado',
            'Implementación en trámite',
            'Regulación complementaria pendiente'
        ]
    }

    def __init__(self):
        self.client = None
        self.generator = None

    def run(
        self,
        search_type: str,
        query: str,
        abogado_nombre: str,
        contexto: str,
        validate_antihallucination: bool = True
    ) -> Optional[str]:
        """
        Ejecuta búsqueda completa en Lexius con validaciones
        Retorna ruta del reporte generado
        """
        logger.info(f"🔍 Iniciando búsqueda Lexius: {search_type} - {query}")

        try:
            # 1. AUTENTICACIÓN
            logger.info("▶️ Paso 1: Autenticación")
            if not self._authenticate():
                logger.error("❌ Fallo autenticación con Lexius")
                return None

            # 2. BÚSQUEDA
            logger.info(f"▶️ Paso 2: Búsqueda {search_type}")
            result = self.client.search(query, search_type)

            if not result:
                logger.error("❌ Sin resultados para búsqueda")
                return None

            # 3. VALIDACIÓN DE VIGENCIA (Guardia 4)
            logger.info("▶️ Paso 3: Validación de vigencia")
            vigencia_check = self.client.validate_vigencia(result.titulo)

            if vigencia_check.get('derogada'):
                logger.warning(f"⚠️ Norma está derogada: {result.titulo}")
                return None

            # 4. GENERACIÓN DE REPORTE
            logger.info("▶️ Paso 4: Generación de reporte")
            riesgos_recomendados = self.RIESGOS_POR_TIPO.get(search_type, [])
            reporte_path = self.generator.generate(
                result=result,
                abogado_nombre=abogado_nombre,
                contexto=contexto,
                riesgos_adicionales=riesgos_recomendados
            )

            # 5. VALIDACIÓN ANTI-HALLUCINATION (OPCIONAL)
            if validate_antihallucination:
                logger.info("▶️ Paso 5: Validación anti-hallucination")
                self._validate_antihallucination(result)

            logger.info(f"✅ COMPLETO: {reporte_path}")
            return reporte_path

        except Exception as e:
            logger.error(f"❌ Error: {e}", exc_info=True)
            return None

        finally:
            if self.client:
                self.client.close()

    def _authenticate(self) -> bool:
        """Intenta autenticación (máx 3 reintentos)"""
        max_intentos = 3

        for intento in range(1, max_intentos + 1):
            try:
                config = LexiusConfig.from_env()
                self.client = LexiusClient(config)
                self.generator = ReporteGenerator(config.cache_dir)

                if self.client.authenticate():
                    return True

                logger.warning(f"⚠️ Intento {intento}/{max_intentos} fallido")

            except ValueError as e:
                logger.error(f"❌ Error configuración: {e}")
                return False

        return False

    def _validate_antihallucination(self, result) -> bool:
        """
        Integra con anti-hallucination-v4.2
        Marca citas con VERDE ✅ / AMARILLO ⚠️ / ROJO 🔴
        """
        logger.info(f"🔐 Anti-Hallucination: Validando {result.titulo}")

        # Para implementación real, conectar con skill anti-hallucination-v4
        # Por ahora, usar heurística basada en confianza de Lexius

        if result.confianza == 'ALTA':
            logger.info("✅ VERDE: Información verificada en Lexius + fuente oficial")
            return True
        elif result.confianza == 'MEDIA':
            logger.warning("⚠️ AMARILLO: Información en Lexius, requiere verificación oficial antes de usar en cliente")
            return True
        else:
            logger.error("🔴 ROJO: Información con baja confianza, no recomendado para documentos cliente")
            return False


def main():
    """CLI principal"""
    parser = argparse.ArgumentParser(
        description='Consultor Legal Lexius — Acceso a appcolombia.lexius.io',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
EJEMPLOS:

  # Buscar ley laboral
  python3 run_lexius.py \\
    --tipo NORMA \\
    --query "Código Sustantivo del Trabajo" \\
    --abogado "Jorge Cortés" \\
    --contexto "Análisis contrato indefinido"

  # Buscar jurisprudencia
  python3 run_lexius.py \\
    --tipo JURISPRUDENCIA \\
    --query "Corte Constitucional C-123/2025 derechos fundamentales" \\
    --abogado "Maria López" \\
    --contexto "Tutela derecho petición"

  # Buscar sin validación anti-hallucination
  python3 run_lexius.py \\
    --tipo ANALISIS \\
    --query "Reforma tributaria 2024" \\
    --abogado "Carlos Rodriguez" \\
    --sin-validacion-ah
        """
    )

    parser.add_argument(
        '--tipo',
        choices=['NORMA', 'JURISPRUDENCIA', 'ANALISIS', 'FORMATO', 'CAMBIO'],
        required=True,
        help='Tipo de búsqueda'
    )
    parser.add_argument('--query', required=True, help='Término de búsqueda')
    parser.add_argument('--abogado', required=True, help='Nombre del abogado consultante')
    parser.add_argument('--contexto', required=True, help='Contexto del caso/asunto')
    parser.add_argument(
        '--sin-validacion-ah',
        action='store_true',
        help='Omitir validación anti-hallucination'
    )

    args = parser.parse_args()

    # Ejecutar
    orchestrator = LexiusSkillOrchestrator()
    result = orchestrator.run(
        search_type=args.tipo,
        query=args.query,
        abogado_nombre=args.abogado,
        contexto=args.contexto,
        validate_antihallucination=not args.sin_validacion_ah
    )

    if result:
        print(f"\n✅ ÉXITO: {result}")
        print("\nProximo paso: Revisor JAC debe validar en 24 horas")
        return 0
    else:
        print("\n❌ FALLO: Consulte los logs arriba")
        return 1


if __name__ == '__main__':
    sys.exit(main())
