# SKILL: Escribir Correos de Primer Contacto

## Tu Trabajo en Esta Ronda

Redactar correos profesionales que se apoyen en UN dato real de cada negocio. Sin dato real verificable = no escribas el correo.

## Proceso Paso a Paso

### 1️⃣ Lee el CSV Enriquecido

Abre `leads/YYYY-MM-DD.csv` actualizado con origen_correo y confianza.

Filtra:
- Solo contactos con **confianza: alta o media** en el correo
- Ordena por **grado** (primero A, luego B)
- Descarta filas sin correo (se llaman por teléfono)

### 2️⃣ Identifica el Ángulo de Cada Contacto

Cada correo necesita UN dato real del scraper:

**Ejemplos de ángulos válidos:**

| Dato Disponible | Ángulo Posible |
|-----------------|----------------|
| Rating 4.8 + 200 reseñas | "Ustedes tienen 4.8 estrellas con 200 reseñas. Eso habla de una operación cuidada." |
| Sector comercio + 25 empleados | "En el sector comercial, los cambios en ley laboral tocan directo. ¿Cómo andan ustedes?" |
| Reseña reciente sobre servicio | "Una reseña de hace poco mencionaba demoras en X. ¿Es un reto que enfrentan?" |
| Fundada hace poco (<1 año) | "Veo que abrieron recientemente. Los primeros 12 meses son los más críticos legalmente." |
| Expansion (múltiples direcciones) | "Crecen rápido con 3 sedes. Con el crecimiento, la estructura legal es un diferenciador." |
| Publicidad activa en Google Ads | "Invierten en Google Ads. Con la inversión viene la necesidad de proteger la marca." |

**Ángulos que NO valen:**

❌ "Veo que existen" (es evidente)  
❌ "Sé que necesitan abogado" (asunción, no dato)  
❌ Información que no está en perfil-cliente.md  
❌ Cumido de otro negocio similar (no es suyo)  

### 3️⃣ Estructura del Correo

```
ASUNTO (máximo 6 palabras, dos opciones)
└─ Versión 1: Directa
└─ Versión 2: En forma de pregunta

CUERPO (máximo 90 palabras total)
├─ Línea 1: EL DATO REAL (verificable en scraper)
├─ Línea 2-3: Puente desde ese dato hasta lo que vendemos
├─ Línea 4: Una pregunta que se responde con SÍ o NO
└─ Firma: Tu nombre + cargo + empresa

CIERRE: Sin calendario, sin "agenda aquí", sin link acortado
```

### 4️⃣ Escribe el Correo Ejemplo

Antes de hacer 30, escribe 3 completos y muéstralos.

**Formato para mostrar:**

```
NEGOCIO: Empresa X
CONTACTO: Juan Pérez
EMAIL: juan@empresax.com
GRADO: A

ASUNTO v1: Ley laboral: cómo sigue el sector comercio
ASUNTO v2: ¿Cómo manejan ustedes los cambios normativos?

CUERPO:
He visto que Empresa X tiene 4.8 estrellas con 200 reseñas en Google — eso solo pasa en operaciones que cuidan detalles. 

Con cambios normativos cada trimestre, esa estructura que mantienen requiere una asesoría jurídica permanente para que no se resienta. 

¿Tienen un abogado en planta o externo que monitoree esos cambios?

---
Jorge Cortés Semprún
Consultor Jurídico
JAC - Abogados Asociados
(+57) 123-456-7890
contacto@prospection.jacabogados.com
```

Espera feedback antes de continuar con el resto.

### 5️⃣ Vuelve Iterativo si Necesario

Si el tono es muy vendedor:
- Quítale la "B" del vendedor: menos "confío en nosotros", más "esto es un cambio objetivo"
- Quítale exclamaciones, emojis, adornos

Si el tono es muy frío:
- Agrega humanidad: "He visto que..." en lugar de "Mi sistema detectó"
- Menos "datos", más "personas"

Si el ángulo es débil:
- Identifica un dato MEJOR de ese contacto
- Rescríbelo con ese dato

### 6️⃣ Genera los Correos Restantes

Cuando apruebes el tono y los 3 ejemplos:

Escribe el resto basándote en la plantilla validada.

**Reglas:**
- Cada correo tiene su ángulo específico (no copias-pegas)
- Máximo 90 palabras el cuerpo
- Dos asuntos distintos (A y B)
- Firma consistente

### 7️⃣ Guarda en CSV

**Archivo:** `correos/YYYY-MM-DD.csv`

**Columnas exactas:**

```
negocio | contacto | email | grado | asunto_a | asunto_b | angulo_usado | cuerpo | estado
```

Donde **estado:** "pendiente_aprobacion" (siempre, hasta que apruebes)

### 8️⃣ Reporte

Para cada ronda:

1. Correos generados: X
2. Grado A: Y
3. Grado B: Z
4. Sin ángulo (no se escribieron): W
5. Próximo paso: "Esperando aprobación para enviarse"

---

## Lo Que NO Hagas

❌ **NO escribas si no hay ángulo.** Espera a que el siguiente paso decida  
❌ **NO copies-pegas** el cuerpo entre correos  
❌ **NO inventes datos** para el ángulo  
❌ **NO hagas correos genéricos** sin el dato específico  
❌ **NO prometas números** que no puedes probar  
❌ **NO escribas si el email es "sin dato" o confianza baja**  

---

## Checklist Antes de Mostrar

- [ ] 3 ejemplos completos con contexto claro
- [ ] Cada asunto: máximo 6 palabras, sin "!"
- [ ] Cada cuerpo: máximo 90 palabras
- [ ] Cada ángulo: verificable en el scraper
- [ ] Firma: consistente y profesional
- [ ] Archivo guardado: correos/YYYY-MM-DD.csv
- [ ] Reporte con 5 números

---

**Skill:** escribir-correos.md  
**Versión:** 1.0  
**Actualizado:** 2026-09-21
