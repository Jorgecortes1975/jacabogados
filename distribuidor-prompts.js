#!/usr/bin/env node

/**
 * Distribuidor de Prompts
 * Extrae cada prompt del archivo maestro y lo guarda en archivo individual
 */

const fs = require('fs');
const path = require('path');

const archivoMaestro = path.join(__dirname, 'prompts-search-console-legal-agrupados.md');
const baseDir = path.join(__dirname, 'prompts-search-console');

const prompts = [
  {
    titulo: "## 📊 GRUPO 1: DIAGNÓSTICO E INVENTARIO\n### Paso 1: Inventario de Exportación Legal",
    archivo: "grupo1_diagnostico/paso-1-inventario-legal.md"
  },
  {
    titulo: "### Paso 2A: Huecos de Contenido Legal (Sin página propia)",
    archivo: "grupo2_huecos/paso-2a-huecos-contenido-legal.md"
  },
  {
    titulo: "### Paso 2B: Zona de Casi (Posición 8 a 20)",
    archivo: "grupo2_huecos/paso-2b-zona-casi.md"
  },
  {
    titulo: "### Paso 2C: Sales Alto Pero No Te Dan Clic (CTR Bajo - Posición 1 a 10)",
    archivo: "grupo2_huecos/paso-2c-ctr-bajo.md"
  },
  {
    titulo: "### Paso 2D: Canibalización (Opcional - Solo si tienes múltiples exportaciones filtradas por página)",
    archivo: "grupo2_huecos/paso-2d-canibalizacion.md"
  },
  {
    titulo: "### Paso 3: Tabla de Qué Hago Primero (Priorización Legal)",
    archivo: "grupo3_priorizacion/paso-3-tabla-priorizada.md"
  },
  {
    titulo: "### Paso 4A: Brief Antes del Artículo Legal",
    archivo: "grupo4_produccion/paso-4a-brief-legal.md"
  },
  {
    titulo: "### Paso 4B: Artículo Completo (Con Datos Legales Propios)",
    archivo: "grupo4_produccion/paso-4b-articulo-completo.md"
  },
  {
    titulo: "### Paso 5A: Auditar con Plugin (Sin Código)",
    archivo: "grupo5_auditoria/paso-5a-auditoria-plugin.md"
  },
  {
    titulo: "### Paso 5B: Reescribir Títulos y Descripciones Que No Ganan Clics",
    archivo: "grupo5_auditoria/paso-5b-titulos-descripciones.md"
  },
  {
    titulo: "### Paso 6: Medir a las Seis Semanas (Cierre del Ciclo)",
    archivo: "grupo6_medicion/paso-6-comparacion-6-semanas.md"
  }
];

console.log("\n📦 Distribuyendo prompts...\n");

const contenido = fs.readFileSync(archivoMaestro, 'utf8');

prompts.forEach((item, idx) => {
  // Buscar sección entre el título actual y el siguiente
  const indexInicio = contenido.indexOf(item.titulo);

  if (indexInicio === -1) {
    console.log(`✗ No encontrado: ${item.titulo}`);
    return;
  }

  let indexFin;
  if (idx < prompts.length - 1) {
    indexFin = contenido.indexOf(prompts[idx + 1].titulo, indexInicio + 1);
  } else {
    indexFin = contenido.length;
  }

  if (indexFin === -1) indexFin = contenido.length;

  const seccion = contenido.substring(indexInicio, indexFin).trim();

  // Guardar archivo
  const rutaArchivo = path.join(baseDir, item.archivo);
  const dirArchivo = path.dirname(rutaArchivo);

  if (!fs.existsSync(dirArchivo)) {
    fs.mkdirSync(dirArchivo, { recursive: true });
  }

  fs.writeFileSync(rutaArchivo, seccion, 'utf8');
  console.log(`✓ ${item.archivo}`);
});

console.log("\n✅ Distribución completada\n");
