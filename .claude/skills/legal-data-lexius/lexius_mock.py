#!/usr/bin/env python3
"""
LEXIUS MOCK CLIENT — Simulador para testing sin conexión real a Lexius
Usable cuando ambiente remoto no tiene acceso a appcolombia.lexius.io

En producción: usa lexius_client.py real
Para testing/demo: usa lexius_mock.py
"""

from dataclasses import dataclass
from typing import Optional, Dict, List, Literal
import logging

logger = logging.getLogger(__name__)


@dataclass
class MockLexiusSearchResult:
    """Resultado de búsqueda simulado"""
    tipo: Literal['NORMA', 'JURISPRUDENCIA', 'ANALISIS', 'FORMATO', 'CAMBIO']
    titulo: str
    contenido: str
    confianza: Literal['ALTA', 'MEDIA', 'BAJA']
    fecha_vigencia: str
    url_fuente: str
    cambios_recientes: Optional[List[str]] = None
    riesgos: Optional[List[str]] = None
    jurisprudencia_relacionada: Optional[List[Dict]] = None


class MockLexiusClient:
    """Cliente simulado de Lexius Colombia para testing"""

    # Base de datos simulada de normas colombianas
    MOCK_DATABASE = {
        'código sustantivo del trabajo': {
            'tipo': 'NORMA',
            'titulo': 'Código Sustantivo del Trabajo (CST)',
            'contenido': '''CÓDIGO SUSTANTIVO DEL TRABAJO

Artículos 37-48: CONTRATO DE TRABAJO

Art. 37. Concepto. Se entiende por contrato de trabajo toda acuerdo entre patrono y trabajador, por el cual
se obliga este a prestar sus servicios personales a aquel, en forma subordinada.

Art. 38. Indicios de contrato de trabajo. Se presume que hay contrato de trabajo en toda relación de
prestación de servicios personales, remunerados por empleador.

Art. 40. Contrato escrito. El contrato de trabajo puede celebrarse por tiempo indefinido o para un
trabajo o servicio determinado.

Art. 47. Termino del contrato. El contrato de trabajo termina:
a) Por mutuo consentimiento
b) Por muerte del trabajador o del patrono
c) Por terminación unilateral según ley
d) Por vencimiento de plazo
e) Por la conclusión de la obra o servicio

Art. 48. Preaviso. Ninguno de los contratantes puede dejar sin efecto el contrato, sino por justa causa
y con el aviso o la indemización, según los casos.

DISPOSICIONES VIGENTES 2026:
- Modificado por Ley 1562/2012 (Sistema Riesgos Laborales)
- Modificado por Decreto 1072/2015 (Reglamentación)
- Vigencia: Indefinida hasta nueva reforma''',
            'confianza': 'ALTA',
            'fecha_vigencia': '2025-12-31',
            'url_fuente': 'https://appcolombia.lexius.io/norma/CST-1950',
            'cambios_recientes': [
                'Decreto 1072/2015: Reglamentación de obligaciones laborales',
                'Ley 1562/2012: Reforma Sistema Riesgos Laborales',
                'Jurisprudencia reciente: Corte Suprema C-123/2025 sobre subordinación'
            ],
            'riesgos': [
                'Interpretación divergente sobre concepto de subordinación',
                'Cambios potenciales en reforma pensional 2026'
            ],
            'jurisprudencia': [
                {
                    'tribunal': 'Corte Constitucional',
                    'titulo': 'Sentencia C-570/2021 - Protección trabajadores',
                    'radicado': 'C-570/2021',
                    'fecha': '2021-07-28'
                },
                {
                    'tribunal': 'Corte Suprema de Justicia',
                    'titulo': 'Sentencia SL/2024-00012 - Contrato indefinido',
                    'radicado': 'SL/2024-00012',
                    'fecha': '2024-03-15'
                }
            ]
        },
        'ley 100 de 1993': {
            'tipo': 'NORMA',
            'titulo': 'Ley 100 de 1993 - Sistema Integral de Seguridad Social',
            'contenido': '''LEY 100 DE 1993
Por la cual se crea el sistema de seguridad social integral y se dictan otras disposiciones.

TITULO I: PRINCIPIOS Y DISPOSICIONES GENERALES

Art. 1. Sistema Integral de Seguridad Social. El sistema de seguridad social integral
es el conjunto de instituciones, normas y procedimientos, de que disponen la persona
y la comunidad para gozar de una calidad de vida acorde con la dignidad del ser humano.

Art. 5. Principios. El sistema de seguridad social integral se fundamenta en:
- Universalidad
- Solidaridad
- Eficiencia
- Integralidad
- Unidad de gestión

COMPONENTES:

PENSIONES:
- Régimen de Prima Media
- Régimen de Capitalización Individual
- Tasas de aportación: 16% del salario

SALUD:
- UPC 2026: $314.020
- Aportación: 8.5% trabajador + 12.5% empleador
- Cobertura integral

RIESGOS LABORALES (Ley 1562/2012):
- Cotización: 0.348% a 8.7% según actividad
- Cobertura accidentes y enfermedades laborales

FAMILIA:
- Cajas de Compensación Familiar
- Subsidio familiar según número hijos''',
            'confianza': 'ALTA',
            'fecha_vigencia': '2025-12-31',
            'url_fuente': 'https://appcolombia.lexius.io/norma/LEY-100-1993',
            'cambios_recientes': [
                'Reforma pensional Ley 2288/2023: cambios en edades y transición',
                'Resolución MINSALUD 2024: nuevas UPC',
                'Decreto 2173/2025: ajuste cotizaciones'
            ],
            'riesgos': [
                'Reforma pensional genera transiciones complejas 2023-2040',
                'UPC cambia anualmente (enero)',
                'Jurisprudencia pendiente sobre constitucionalidad derechos adquiridos'
            ],
            'jurisprudencia': [
                {
                    'tribunal': 'Corte Constitucional',
                    'titulo': 'Sentencia C-476/2022 - Derechos pensionales',
                    'radicado': 'C-476/2022',
                    'fecha': '2022-11-10'
                }
            ]
        },
        'derechos de petición': {
            'tipo': 'NORMA',
            'titulo': 'Derechos de Petición - Constitución Política',
            'contenido': '''CONSTITUCIÓN POLÍTICA DE COLOMBIA (1991)

ARTÍCULO 23: DERECHO DE PETICIÓN

Todo ciudadano tiene el derecho a presentar peticiones respetuosas a las autoridades
por motivos de interés general o particular, y a obtener pronta resolución.

La ley establecerá los términos en que la administración estará obligada a resolver
las peticiones que le presenten, con las formalidades y requisitos que ella señale.

CARACTERÍSTICAS JURÍDICAS:

1. UNIVERSAL: Todo ciudadano colombiano tiene derecho
2. GRATUITO: No requiere pago ni arancel
3. PROCEDIMIENTO: Máximo 30 días para respuesta (art. 14 Decreto 2191/2003)
4. REQUISITOS MÍNIMOS:
   - Nombre del peticionario
   - Identificación
   - Dirección
   - Descripción clara de la petición
   - Firma o huella

TIPOS DE PETICIÓN:
- Petición ordinaria: asuntos administrativos
- Consulta: solicitud de información
- Queja: inconformidad con acto administrativo
- Denuncia: reporte de hechos ilegales

PROTECCIÓN CONSTITUCIONAL:
- Acción de tutela por incumplimiento (art. 86)
- Nulidad y restablecimiento del derecho ante juzgado
- Responsabilidad de servidor público por incumplimiento''',
            'confianza': 'ALTA',
            'fecha_vigencia': '2025-12-31',
            'url_fuente': 'https://appcolombia.lexius.io/norma/CONST-ART-23',
            'cambios_recientes': [
                'Jurisprudencia Corte Constitucional 2024 sobre plazo razonable',
                'Decreto 2191/2003 actualizado con Decreto 1265/2024'
            ],
            'riesgos': [
                'Jurisprudencia divergente sobre qué constituye "pronta resolución"',
                'Entidades incumplen términos frecuentemente sin sanción clara'
            ],
            'jurisprudencia': [
                {
                    'tribunal': 'Corte Constitucional',
                    'titulo': 'Sentencia T-617/2021 - Derecho de petición',
                    'radicado': 'T-617/2021',
                    'fecha': '2021-09-16'
                }
            ]
        },
        'impuesto a la renta': {
            'tipo': 'NORMA',
            'titulo': 'Impuesto sobre la Renta - Estatuto Tributario',
            'contenido': '''ESTATUTO TRIBUTARIO NACIONAL - LIBRO I
IMPUESTO SOBRE LA RENTA

SUJETO PASIVO:
Art. 10. Son contribuyentes del impuesto sobre la renta:
- Personas naturales residentes
- Personas jurídicas
- Entidades territoriales
- Fondos y fondaciones
- Sociedades extranjeras con establecimiento permanente

BASE GRAVABLE:
- Renta líquida = Renta bruta menos deducciones
- Renta bruta = ingresos durante el año fiscal menos devoluciones
- Deducciones: gastos necesarios para producir renta, intereses, contribuciones

TARIFA 2026:
- Personas naturales: 0% a 39% (según tramos de renta)
- Personas jurídicas: 30% (tasa general)
- Ganancias ocasionales: 10%

OBLIGACIONES:
- Declaración anual (antes del 15 de abril)
- Retención en la fuente por terceros
- Aportes a seguridad social deducibles

RÉGIMEN SIMPLIFICADO:
- Ingresos anuales < $40.000.000
- Tarifa única: 8%
- Declaración simplificada''',
            'confianza': 'ALTA',
            'fecha_vigencia': '2025-12-31',
            'url_fuente': 'https://appcolombia.lexius.io/norma/ESTATUTO-TRIBUTARIO',
            'cambios_recientes': [
                'Reforma tributaria Ley 2294/2023: nuevos tramos e impuestos a capital',
                'Decreto 1625/2024: actualización sistemas tributarios',
                'Resolución DIAN 2024-2046: instrucciones declaración 2025'
            ],
            'riesgos': [
                'Reforma tributaria aún en interpretación DIAN/jurisprudencia',
                'Cambios anuales en tarifas y deducciones',
                'Conflictos jurisprudenciales sobre qué constituye "necesario" para producir renta'
            ],
            'jurisprudencia': [
                {
                    'tribunal': 'Corte Constitucional',
                    'titulo': 'Sentencia C-241/2024 - Constitucionalidad reforma tributaria',
                    'radicado': 'C-241/2024',
                    'fecha': '2024-06-05'
                }
            ]
        }
    }

    def __init__(self):
        self._authenticated = True  # Mock siempre autentica
        logger.info("✅ Mock Lexius inicializado (simulador)")

    def authenticate(self) -> bool:
        """Mock: siempre retorna True"""
        logger.info("🎭 Mock authenticate: TRUE")
        return True

    def search(self, query: str, search_type: str = 'NORMA', jurisdiction: str = 'Colombia'):
        """Busca en base de datos simulada"""
        query_lower = query.lower()

        # Buscar coincidencia
        for key, data in self.MOCK_DATABASE.items():
            if key in query_lower or query_lower in key:
                logger.info(f"✅ Mock search encontrado: {data['titulo']}")
                return MockLexiusSearchResult(
                    tipo=data['tipo'],
                    titulo=data['titulo'],
                    contenido=data['contenido'],
                    confianza=data['confianza'],
                    fecha_vigencia=data['fecha_vigencia'],
                    url_fuente=data['url_fuente'],
                    cambios_recientes=data.get('cambios_recientes'),
                    riesgos=data.get('riesgos'),
                    jurisprudencia_relacionada=data.get('jurisprudencia')
                )

        logger.warning(f"⚠️  Mock search: sin coincidencia para '{query}'")
        return None

    def validate_vigencia(self, norma_title: str) -> Dict:
        """Mock: siempre retorna norma vigente"""
        return {
            'vigente': True,
            'derogada': False,
            'modificaciones': [],
            'fecha_ultima_actualizacion': '2026-07-16'
        }

    def close(self):
        """Mock: no hace nada"""
        logger.info("✅ Mock sesión cerrada")

    def __enter__(self):
        return self

    def __exit__(self, *args):
        self.close()


if __name__ == '__main__':
    client = MockLexiusClient()

    # Test búsqueda
    result = client.search('Código Sustantivo del Trabajo', search_type='NORMA')
    if result:
        print(f"✅ {result.titulo}")
        print(f"   Confianza: {result.confianza}")
        print(f"   Cambios: {len(result.cambios_recientes or [])} identificados")

    client.close()
