---
name: dashboard-ejecutivo-col
description: >
  Genera dashboards HTML ejecutivos y reportes visuales profesionales para
  clientes corporativos del Bufete, para el despacho mismo y para la plataforma
  LEXA-LAB. Produce archivos HTML autocontenidos con KPIs, semáforos, tablas,
  diagnósticos por área y plan de acción, listos para presentar a directivos,
  socios o clientes. Activar ante: genera dashboard, crea reporte visual, dashboard
  HTML, tablero ejecutivo, reporte para el cliente, informe visual, quiero un
  dashboard, genera el HTML, crea el tablero, reporte de KPIs, informe para socios,
  quiero mostrar esto visualmente, presentación ejecutiva, archivo para presentar.
  SIEMPRE activar cuando el usuario pida un entregable visual o un archivo HTML
  para presentar análisis, diagnósticos, KPIs o planes de acción.
---

# DASHBOARD EJECUTIVO COLOMBIA — v1.0
## Bufete Cortés Cartagena — LEXA-LAB Empresarial

**Abogado titular:** Jorge Ángel Cortés Cartagena — T.P. 365.594
**Estándar:** Diseño premium, datos verificados, cero relleno visual
**Versión:** 1.0 — Junio 2026

---

## NATURALEZA DE LA SKILL

Esta skill genera archivos HTML ejecutivos, completos y autocontenidos que pueden abrirse directamente en navegador sin dependencias externas. El output es un artefacto profesional listo para presentar a directivos, clientes o socios.

**Regla de producción:** Todo dashboard tiene datos reales o supuestos declarados. Nunca se generan cifras inventadas para "verse bien". El dashboard refleja lo que se sabe, no lo que se imagina.

---

## CUÁNDO ACTIVAR

Esta skill se activa cuando el usuario:

- Pide "un dashboard" o "un tablero" en cualquier formato
- Pide "un reporte visual" o "algo para mostrar"
- Completa un análisis empresarial y quiere el entregable visual
- Quiere presentar resultados del despacho a socios o clientes
- Necesita un entregable HTML descargable para una reunión
- Usa la skill `analisis-empresarial-col` y pide la salida en HTML

---

## TIPOS DE DASHBOARD

### Tipo A: Dashboard Empresarial (clientes corporativos)
Para empresas clientes del Bufete que necesitan análisis ejecutivo.

### Tipo B: Dashboard del Despacho
Para seguimiento interno de Bufete Cortés Cartagena: causas, KPIs, facturación.

### Tipo C: Dashboard LEXA-LAB
Para seguimiento de la plataforma: usuarios, conversiones, impacto.

### Tipo D: Dashboard Jurídico de Caso
Para presentar el estado de un caso complejo a un cliente: etapas, documentos, riesgos, próximos pasos.

---

## ESTRUCTURA OBLIGATORIA DEL HTML

Todo dashboard producido debe contener estos bloques, en este orden:

### Bloque 1: Header Premium
```
- Logo / nombre del despacho o empresa
- Título del dashboard
- Período analizado
- Fecha de generación
- Estado general (semáforo: Verde / Amarillo / Rojo)
- Responsable del análisis
```

### Bloque 2: Cards de KPIs (4-8 máximo)
```
Para cada KPI:
- Valor principal (grande, visible)
- Etiqueta del KPI
- Variación vs período anterior (si está disponible)
- Estado visual (color según semáforo)
- Lectura ejecutiva en 1 línea
```

### Bloque 3: Diagnóstico por Área
```
Tabla o tarjetas con:
- Área (Finanzas, Comercial, Operaciones, Riesgos, etc.)
- Diagnóstico (1-2 líneas)
- Evidencia o supuesto
- Riesgo principal
- Recomendación concreta
```

### Bloque 4: Visualizaciones Simples
```
Solo con CSS puro (sin JavaScript):
- Barras de progreso CSS
- Semáforos de color
- Mini tablas comparativas
- Escala de riesgos (probabilidad x impacto)
- Timeline de hitos o etapas
```

### Bloque 5: Insights Accionables
```
Lista de hallazgos clave:
- Hallazgo (concreto, sin retórica)
- Evidencia o base del hallazgo
- Decisión sugerida (sin ambigüedad)
```

### Bloque 6: Plan 30/60/90 Días
```
Tabla de acciones:
- Acción (verbo en infinitivo, concreta)
- Responsable sugerido
- Plazo (30/60/90)
- Métrica de éxito
- Prioridad (Alta / Media / Baja)
```

### Bloque 7: Advertencias y Notas
```
- Fuentes de información utilizadas
- Datos inferidos o supuestos declarados
- Necesidad de validación profesional (contable, jurídica)
- Fecha límite para revisión del dashboard
```

---

## ESTÁNDAR DE DISEÑO CSS

El HTML usa CSS interno. No depende de frameworks externos. Aplicar:

```css
/* Paleta Bufete Cortés Cartagena */
--color-primario: #1F3864;    /* Azul institucional */
--color-acento: #B8860B;      /* Dorado */
--color-verde: #2ECC71;       /* Estado OK */
--color-amarillo: #F39C12;    /* Alerta */
--color-rojo: #E74C3C;        /* Crítico */
--color-fondo: #F8F9FA;       /* Fondo limpio */
--color-texto: #2C3E50;       /* Texto principal */

/* Tipografía */
font-family: 'Segoe UI', Arial, sans-serif;

/* Layout */
max-width: 1200px;
margin: 0 auto;
padding: 24px;

/* Cards */
border-radius: 8px;
box-shadow: 0 2px 8px rgba(0,0,0,0.1);
padding: 20px;
background: white;

/* Responsive básico */
@media (max-width: 768px) { 
  grid-template-columns: 1fr; 
}
```

### Reglas de diseño no negociables:
- Diseño limpio, sin decoraciones innecesarias
- Contraste adecuado para lectura en pantalla y proyector
- Responsive básico para móvil
- Sin JavaScript (salvo autorización explícita del usuario)
- Tablas con hover para legibilidad
- Semáforos de color usando CSS puro

---

## REGLA DE DATOS

**Lo que está acreditado** → se muestra con valor exacto y fuente
**Lo que fue afirmado** → se muestra con nota "Dato aportado por el cliente"
**Lo que es inferencia** → se muestra con nota "Estimado" o "Proyectado"
**Lo que no se tiene** → se muestra como "N/D" con nota de por qué falta

Nunca se inventan cifras. Nunca se rellenan espacios con datos ficticios.

---

## NOMBRE DE ARCHIVO

El archivo se guarda en:

```
/mnt/user-data/outputs/dashboard-[nombre-empresa-o-caso]-[fecha].html
```

Si el usuario no especifica nombre:

```
/mnt/user-data/outputs/dashboard-ejecutivo-[fecha].html
```

---

## INTEGRACIÓN CON EL ECOSISTEMA

```
analisis-empresarial-col → produce el análisis
         ↓
dashboard-ejecutivo-col (ESTA SKILL) → convierte en HTML visual
         ↓
compilador-documental → integra con expediente si se requiere Word
         ↓
Entrega al cliente o presentación en reunión
```

---

## PROTOCOLO ANTI-ALUCINACIÓN

- No inventar KPIs que el usuario no proporcionó
- No proyectar crecimientos sin base en datos aportados
- No usar benchmarks sectoriales sin declararlos como referenciales
- No representar gráficamente datos que no fueron entregados
- Si el dashboard queda con secciones vacías, dejarlas como "N/D — dato pendiente"

---

## CALIDAD MÍNIMA DEL ENTREGABLE

El archivo HTML entregado debe:

1. Abrirse correctamente en Chrome/Firefox sin errores
2. Verse profesional (no como HTML básico universitario)
3. Ser autocontenido (no depender de CDNs ni URLs externas)
4. Contener todos los 7 bloques obligatorios
5. Mostrar solo datos con fuente declarada
6. Tener el logo/marca del Bufete o del cliente, según el tipo
7. Incluir fecha de generación y período analizado

---

*Bufete Cortés Cartagena — Jorge Ángel Cortés Cartagena T.P. 365.594 — Medellín, Colombia — 2026*
