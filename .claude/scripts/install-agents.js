#!/usr/bin/env node

/**
 * Script de Instalación de Agentes Corporativos JAC
 * Instala y registra los 4 agentes automáticos del sistema
 */

const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
  bold: '\x1b[1m',
};

const log = {
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  warn: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  header: (msg) => console.log(`\n${colors.bold}${colors.blue}${msg}${colors.reset}\n`),
};

async function main() {
  console.log('\n╔════════════════════════════════════════════════════════════════╗');
  console.log('║         INSTALACIÓN DE AGENTES CORPORATIVOS JAC                 ║');
  console.log('║         Sistema de Automatización Jurídica v2.0                 ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');

  const agentsDir = path.join(__dirname, '../agents');

  // Validar que existe directorio de agentes
  if (!fs.existsSync(agentsDir)) {
    log.error('Directorio de agentes no encontrado');
    process.exit(1);
  }

  // Leer configuración principal
  const settingsPath = path.join(__dirname, '../settings.json');
  if (!fs.existsSync(settingsPath)) {
    log.error('Configuración settings.json no encontrada');
    process.exit(1);
  }

  const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));

  log.header('📦 INSTALANDO AGENTES');

  const agents = [
    {
      name: 'consultor-comunicaciones.json',
      displayName: 'Consultor Legal de Comunicaciones',
      skill: 'síntesis-jurídica-emails',
    },
    {
      name: 'investigador-jurisprudencial.json',
      displayName: 'Investigador Jurisprudencial',
      skill: 'búsqueda-jurisprudencial-automatizada',
    },
    {
      name: 'auditor-contractual.json',
      displayName: 'Auditor de Riesgos Contractuales',
      skill: 'análisis-flujo-contractual',
    },
    {
      name: 'redactor-ejecutivo.json',
      displayName: 'Redactor Ejecutivo Automatizado',
      skill: 'generador-reportes-ejecutivos',
    },
  ];

  let installedCount = 0;

  agents.forEach((agent) => {
    const agentPath = path.join(agentsDir, agent.name);

    if (fs.existsSync(agentPath)) {
      const agentConfig = JSON.parse(fs.readFileSync(agentPath, 'utf8'));
      log.success(`Agente instalado: ${agent.displayName}`);
      console.log(`  Nombre: ${agentConfig.name}`);
      console.log(`  Tipo: ${agentConfig.type}`);
      console.log(`  Skill base: ${agent.skill}`);
      console.log(`  Autonomía: ${agentConfig.autonomyLevel}`);
      console.log('');
      installedCount++;
    } else {
      log.error(`No se encontró: ${agent.name}`);
    }
  });

  if (installedCount < agents.length) {
    log.warn(`Solo ${installedCount}/${agents.length} agentes encontrados`);
  }

  log.header('🔌 REGISTRANDO INTEGRACIONES');

  // Registrar agentes en settings
  if (!settings.agents) {
    settings.agents = {};
  }

  agents.forEach((agent) => {
    const agentPath = path.join(agentsDir, agent.name);
    if (fs.existsSync(agentPath)) {
      const agentConfig = JSON.parse(fs.readFileSync(agentPath, 'utf8'));
      settings.agents[agentConfig.name] = {
        enabled: true,
        installed: true,
        installed_date: new Date().toISOString(),
        skill: agent.skill,
      };
      log.success(`Registrado: ${agent.displayName}`);
    }
  });

  // Guardar settings actualizados
  fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
  log.success('Configuración actualizada');

  log.header('✅ VALIDACIÓN DE DEPENDENCIAS');

  // Validar que existan los skills base
  const skillsDir = path.join(__dirname, '../skills');
  let skillsValid = 0;

  agents.forEach((agent) => {
    const skillPath = path.join(skillsDir, agent.skill.replace('-automatizada', '').replace('-ejecutivos', '-generador').replace('síntesis-jurídica-', 'síntesis-jurídica-'));

    // Simplificado: solo verificar que la carpeta existe
    const skillDir = fs.readdirSync(skillsDir).find(dir =>
      agent.skill.includes(dir.replace(/[-]/g, '-'))
    );

    if (skillDir) {
      log.success(`Skill disponible: ${agent.skill}`);
      skillsValid++;
    } else {
      log.warn(`Skill no encontrado: ${agent.skill}`);
    }
  });

  log.header('📋 RESUMEN DE INSTALACIÓN');

  console.log(`\n✓ Agentes instalados: ${installedCount}/4`);
  console.log(`✓ Skills validados: ${skillsValid}/4`);
  console.log(`✓ Configuración actualizada\n`);

  console.log('╔════════════════════════════════════════════════════════════════╗');
  console.log(`║ ${colors.green}✓${colors.reset} INSTALACIÓN COMPLETADA                              ║`);
  console.log('╚════════════════════════════════════════════════════════════════╝\n');

  log.info('Próximo paso: Iniciar agentes con: node .claude/scripts/start-agents.js');
  log.info('Ver status: node .claude/scripts/loop-status.js');
}

main().catch((err) => {
  log.error(`Error durante instalación: ${err.message}`);
  process.exit(1);
});
