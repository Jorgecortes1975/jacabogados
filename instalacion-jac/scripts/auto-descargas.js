#!/usr/bin/env node

/**
 * AUTO-DESCARGAS JAC
 * Sincroniza y organiza descargas automáticamente
 *
 * Uso:
 *   node auto-descargas.js
 *
 * Funciones:
 * - Monitorea carpeta Downloads
 * - Organiza archivos por tipo
 * - Renombra con fecha y prefijo
 * - Genera log de sincronización
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

// Configuración
const config = {
  downloadsDir: path.join(process.env.USERPROFILE || os.homedir(), 'Downloads'),
  organizadoDir: path.join(process.env.USERPROFILE || os.homedir(), 'Documents', 'JAC-Documentos'),
  logDir: path.join(process.env.USERPROFILE || os.homedir(), 'Documents', 'JAC-Logs'),
  timestamp: new Date().toISOString().split('T')[0]
};

// Extensiones por categoría
const categorias = {
  'Auditorías': ['.docx', '.doc'],
  'Jurisprudencia': ['.pdf', '.txt'],
  'Contratos': ['.docx', '.doc', '.pdf'],
  'Imágenes': ['.jpg', '.jpeg', '.png', '.gif'],
  'Otros': []
};

function inicializar() {
  console.log('\n🔄 Iniciando sincronización automática de descargas...\n');

  // Crear directorios si no existen
  [config.organizadoDir, config.logDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`✅ Directorio creado: ${dir}`);
    }
  });

  // Crear subdirectorios por categoría
  Object.keys(categorias).forEach(cat => {
    const catDir = path.join(config.organizadoDir, cat);
    if (!fs.existsSync(catDir)) {
      fs.mkdirSync(catDir, { recursive: true });
      console.log(`✅ Categoría creada: ${cat}`);
    }
  });

  console.log('\n📁 Directorios configurados.');
}

function obtenerCategoria(extension) {
  for (const [categoria, exts] of Object.entries(categorias)) {
    if (exts.includes(extension.toLowerCase())) {
      return categoria;
    }
  }
  return 'Otros';
}

function renombrarArchivo(nombreOriginal) {
  const ext = path.extname(nombreOriginal);
  const nombre = path.basename(nombreOriginal, ext);

  // Si ya tiene fecha, no renombrar
  if (/^\d{4}-\d{2}-\d{2}/.test(nombre)) {
    return nombreOriginal;
  }

  return `${config.timestamp}_${nombre}${ext}`;
}

function sincronizar() {
  console.log('\n🔍 Buscando archivos en Downloads...\n');

  if (!fs.existsSync(config.downloadsDir)) {
    console.log(`❌ Carpeta Downloads no encontrada: ${config.downloadsDir}`);
    return { procesados: 0, errores: 0 };
  }

  const archivos = fs.readdirSync(config.downloadsDir);
  let procesados = 0;
  let errores = 0;
  const log = [];

  archivos.forEach(archivo => {
    const rutaOrigen = path.join(config.downloadsDir, archivo);

    // Ignorar directorios
    if (fs.statSync(rutaOrigen).isDirectory()) {
      return;
    }

    try {
      const ext = path.extname(archivo);
      const categoria = obtenerCategoria(ext);
      const nuevoNombre = renombrarArchivo(archivo);
      const rutaDestino = path.join(config.organizadoDir, categoria, nuevoNombre);

      // Si el archivo ya está en la ubicación correcta, no mover
      if (rutaOrigen === rutaDestino) {
        console.log(`⏭️  ${archivo} (ya organizado)`);
        log.push(`SKIP: ${archivo}`);
        return;
      }

      // Mover archivo
      fs.copyFileSync(rutaOrigen, rutaDestino);

      console.log(`✅ ${archivo} → ${categoria}/`);
      log.push(`MOVED: ${archivo} → ${categoria}/${nuevoNombre}`);
      procesados++;

    } catch (error) {
      console.log(`❌ Error con ${archivo}: ${error.message}`);
      log.push(`ERROR: ${archivo} - ${error.message}`);
      errores++;
    }
  });

  // Guardar log
  const logContent = [
    `SINCRONIZACIÓN AUTOMÁTICA JAC`,
    `Fecha: ${config.timestamp} ${new Date().toLocaleTimeString('es-CO')}`,
    `Directorio: ${config.downloadsDir}`,
    `Procesados: ${procesados}`,
    `Errores: ${errores}`,
    '',
    'DETALLE:',
    ...log
  ].join('\n');

  const logPath = path.join(config.logDir, `sync_${config.timestamp}.log`);
  fs.writeFileSync(logPath, logContent);

  console.log(`\n📋 Log guardado: ${logPath}`);

  return { procesados, errores, logPath };
}

function mostrarEstadisticas() {
  console.log('\n📊 ESTADÍSTICAS DE ORGANIZACIÓN:\n');

  Object.keys(categorias).forEach(categoria => {
    const catDir = path.join(config.organizadoDir, categoria);
    if (fs.existsSync(catDir)) {
      const archivos = fs.readdirSync(catDir);
      console.log(`${categoria}: ${archivos.length} archivo(s)`);
    }
  });
}

// Ejecutar
try {
  inicializar();
  const resultado = sincronizar();
  mostrarEstadisticas();

  console.log(`\n✅ Sincronización completada:`);
  console.log(`   Archivos procesados: ${resultado.procesados}`);
  console.log(`   Errores: ${resultado.errores}`);
  console.log(`   📂 Ubicación: ${config.organizadoDir}\n`);

  process.exit(0);
} catch (error) {
  console.error(`\n❌ Error fatal: ${error.message}\n`);
  process.exit(1);
}
