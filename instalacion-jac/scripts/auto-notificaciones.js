#!/usr/bin/env node

/**
 * AUTO-NOTIFICACIONES JAC
 * Genera alertas automáticas de vencimientos y fechas importantes
 *
 * Uso:
 *   node auto-notificaciones.js "2026-09-15" "Vencimiento demanda Luz Deira"
 *
 * O revisar alertas pendientes:
 *   node auto-notificaciones.js --check
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

// Configuración
const config = {
  alertasDir: path.join(process.env.USERPROFILE || os.homedir(), 'Documents', 'JAC-Alertas'),
  archivoCasos: path.join(process.env.USERPROFILE || os.homedir(), 'Documents', 'JAC-Alertas', 'casos.json'),
  timestamp: new Date().toISOString()
};

// Inicializar directorio
function inicializar() {
  if (!fs.existsSync(config.alertasDir)) {
    fs.mkdirSync(config.alertasDir, { recursive: true });
  }

  if (!fs.existsSync(config.archivoCasos)) {
    fs.writeFileSync(config.archivoCasos, JSON.stringify([], null, 2));
  }
}

function agregarAlerta(fecha, descripcion, prioridad = 'normal') {
  inicializar();

  // Validar fecha
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
    console.error('❌ Fecha inválida. Use formato: YYYY-MM-DD');
    process.exit(1);
  }

  const casos = JSON.parse(fs.readFileSync(config.archivoCasos, 'utf-8'));

  const nuevaAlerta = {
    id: Date.now().toString(),
    fecha,
    descripcion,
    prioridad,
    creada: config.timestamp,
    completada: false
  };

  casos.push(nuevaAlerta);
  fs.writeFileSync(config.archivoCasos, JSON.stringify(casos, null, 2));

  console.log(`\n✅ Alerta creada:`);
  console.log(`   📅 Fecha: ${fecha}`);
  console.log(`   📝 ${descripcion}`);
  console.log(`   🎯 Prioridad: ${prioridad}\n`);
}

function verificarAlertas() {
  inicializar();

  const casos = JSON.parse(fs.readFileSync(config.archivoCasos, 'utf-8'));
  const hoy = new Date().toISOString().split('T')[0];

  console.log('\n📋 ALERTAS ACTIVAS:\n');

  const porVencer = casos.filter(c => !c.completada);

  if (porVencer.length === 0) {
    console.log('✅ No hay alertas pendientes.\n');
    return;
  }

  porVencer.forEach(alerta => {
    const diasRestantes = calcularDias(alerta.fecha, hoy);
    let estado = '';

    if (diasRestantes < 0) {
      estado = `🔴 VENCIDO (hace ${Math.abs(diasRestantes)} días)`;
    } else if (diasRestantes === 0) {
      estado = `🟠 ¡HOY!`;
    } else if (diasRestantes <= 3) {
      estado = `🟠 URGENTE (${diasRestantes} días)`;
    } else if (diasRestantes <= 7) {
      estado = `🟡 PRÓXIMO (${diasRestantes} días)`;
    } else {
      estado = `🟢 OK (${diasRestantes} días)`;
    }

    console.log(`${estado}`);
    console.log(`  📅 ${alerta.fecha} - ${alerta.descripcion}`);
    console.log(`  🎯 Prioridad: ${alerta.prioridad}`);
    console.log();
  });

  // Resumen
  const vencidos = porVencer.filter(c => calcularDias(c.fecha, hoy) < 0).length;
  const urgentes = porVencer.filter(c => {
    const dias = calcularDias(c.fecha, hoy);
    return dias >= 0 && dias <= 3;
  }).length;

  if (vencidos > 0 || urgentes > 0) {
    console.log(`\n⚠️  ATENCIÓN: ${vencidos} vencidos, ${urgentes} urgentes`);
  }

  console.log(`\n📊 Total de alertas: ${porVencer.length}\n`);
}

function calcularDias(fecha1, fecha2) {
  const d1 = new Date(fecha1);
  const d2 = new Date(fecha2);
  const diff = d1 - d2;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function generarReporte() {
  inicializar();

  const casos = JSON.parse(fs.readFileSync(config.archivoCasos, 'utf-8'));
  const hoy = new Date().toISOString().split('T')[0];

  const contenido = [
    'REPORTE DE ALERTAS JAC',
    `Generado: ${new Date().toLocaleString('es-CO')}`,
    '',
    '═══════════════════════════════════════════════════════════',
    '',
    `ALERTAS PENDIENTES: ${casos.filter(c => !c.completada).length}`,
    '',
    ...casos.filter(c => !c.completada).map(c => {
      const dias = calcularDias(c.fecha, hoy);
      return `${c.fecha} - ${c.descripcion} (${dias} días)`;
    }),
    '',
    '═══════════════════════════════════════════════════════════'
  ].join('\n');

  const reportePath = path.join(config.alertasDir, `reporte_${hoy}.txt`);
  fs.writeFileSync(reportePath, contenido);

  console.log(`\n✅ Reporte generado: ${reportePath}\n`);
}

// Procesar argumentos
const args = process.argv.slice(2);

if (args[0] === '--check') {
  verificarAlertas();
} else if (args[0] === '--reporte') {
  generarReporte();
} else if (args.length >= 2) {
  agregarAlerta(args[0], args.slice(1).join(' '));
} else {
  console.log(`\nAuto-Notificaciones JAC\n`);
  console.log('Uso:');
  console.log('  node auto-notificaciones.js "YYYY-MM-DD" "Descripción"');
  console.log('  node auto-notificaciones.js --check');
  console.log('  node auto-notificaciones.js --reporte\n');
  console.log('Ejemplos:');
  console.log('  node auto-notificaciones.js "2026-09-15" "Vencimiento demanda"');
  console.log('  node auto-notificaciones.js --check\n');
}
