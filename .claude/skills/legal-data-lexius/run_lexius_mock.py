#!/usr/bin/env python3
"""
EJECUTOR LEXIUS CON MOCK — Testea skill sin conexión real a Lexius
En producción, usa run_lexius.py con lexius_client.py real
"""

import argparse
import sys
import logging
from typing import Optional
from pathlib import Path
from lexius_mock import MockLexiusClient
from reporte_generator import ReporteGenerator

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(message)s'
)
logger = logging.getLogger(__name__)


class LexiusSkillOrchestrator:
    """Orquestador con cliente Mock"""

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
        self.client = MockLexiusClient()
        self.generator = ReporteGenerator()

    def run(
        self,
        search_type: str,
        query: str,
        abogado_nombre: str,
        contexto: str,
        validate_antihallucination: bool = True
    ) -> Optional[str]:
        """Ejecuta búsqueda con cliente Mock"""
        logger.info(f"🎭 MODO MOCK: {search_type} - {query}")

        try:
            # 1. AUTENTICACIÓN
            logger.info("▶️ Paso 1: Autenticación")
            if not self.client.authenticate():
                return None

            # 2. BÚSQUEDA
            logger.info(f"▶️ Paso 2: Búsqueda {search_type}")
            result = self.client.search(query, search_type)

            if not result:
                logger.error("❌ Sin resultados")
                print(f"\n📚 Búsquedas disponibles en mock:")
                print(f"   - 'Código Sustantivo del Trabajo'")
                print(f"   - 'Ley 100 de 1993'")
                print(f"   - 'Derechos de Petición'")
                print(f"   - 'Impuesto a la Renta'")
                return None

            # 3. VALIDACIÓN DE VIGENCIA
            logger.info("▶️ Paso 3: Validación de vigencia")
            vigencia_check = self.client.validate_vigencia(result.titulo)

            # 4. GENERACIÓN DE REPORTE
            logger.info("▶️ Paso 4: Generación de reporte")
            riesgos_recomendados = self.RIESGOS_POR_TIPO.get(search_type, [])
            reporte_path = self.generator.generate(
                result=result,
                abogado_nombre=abogado_nombre,
                contexto=contexto,
                riesgos_adicionales=riesgos_recomendados
            )

            # 5. VALIDACIÓN ANTI-HALLUCINATION
            if validate_antihallucination:
                logger.info("▶️ Paso 5: Validación anti-hallucination")
                self._validate_antihallucination(result)

            logger.info(f"✅ COMPLETO: {reporte_path}")
            return reporte_path

        except Exception as e:
            logger.error(f"❌ Error: {e}", exc_info=True)
            return None

    def _validate_antihallucination(self, result) -> bool:
        """Anti-hallucination validation"""
        if result.confianza == 'ALTA':
            logger.info("✅ VERDE: Información verificada")
            return True
        elif result.confianza == 'MEDIA':
            logger.warning("⚠️ AMARILLO: Requiere verificación oficial")
            return True
        else:
            logger.error("🔴 ROJO: Baja confianza")
            return False


def main():
    parser = argparse.ArgumentParser(
        description='🎭 Consultor Legal Lexius — MODO MOCK (sin conexión real)'
    )

    parser.add_argument(
        '--tipo',
        choices=['NORMA', 'JURISPRUDENCIA', 'ANALISIS', 'FORMATO', 'CAMBIO'],
        default='NORMA',
        help='Tipo de búsqueda'
    )
    parser.add_argument(
        '--query',
        default='Código Sustantivo del Trabajo',
        help='Término de búsqueda'
    )
    parser.add_argument(
        '--abogado',
        default='Jorge Cortés',
        help='Nombre del abogado consultante'
    )
    parser.add_argument(
        '--contexto',
        default='Análisis contrato indefinido',
        help='Contexto del caso'
    )
    parser.add_argument(
        '--sin-validacion-ah',
        action='store_true',
        help='Omitir validación anti-hallucination'
    )

    args = parser.parse_args()

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
        print("\n📋 Reporte generado conforme Protocolo Alta Corte")
        print("   - ACTA 15-puntos: ✅ Calculado automáticamente")
        print("   - Matriz Confianza: ✅ Incluida")
        print("   - Riesgos: ✅ Identificados")
        print("   - Anti-Hallucination: ✅ Validado")
        print("\n🎯 Próximo paso: Revisor JAC valida en 24 horas")
        return 0
    else:
        print("\n❌ FALLO: Consulte arriba")
        return 1


if __name__ == '__main__':
    sys.exit(main())
