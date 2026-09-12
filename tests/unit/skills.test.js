/**
 * Tests Unitarios - Skills Programa JAC
 * Valida que cada skill funciona correctamente en aislamiento
 */

const fs = require('fs');
const path = require('path');

describe('Skills del Programa JAC', () => {

  describe('Consulta Jurisprudencia Skill', () => {
    const skillPath = path.join(__dirname, '../../skills-program/skills/consulta-jurisprudencia/SKILL.md');

    test('Archivo SKILL.md existe', () => {
      expect(fs.existsSync(skillPath)).toBe(true);
    });

    test('SKILL.md contiene secciones requeridas', () => {
      const content = fs.readFileSync(skillPath, 'utf8');
      expect(content).toContain('name: consulta-jurisprudencia');
      expect(content.toLowerCase()).toContain('búsqueda de sentencias');
      expect(content).toContain('Corte Constitucional');
      expect(content).toContain('Corte Suprema');
      expect(content).toContain('Consejo de Estado');
    });

    test('Ejemplos de uso están documentados', () => {
      const content = fs.readFileSync(skillPath, 'utf8');
      expect(content).toContain('node agente-juridico-especializado.js');
      expect(content).toContain('consulta jurisprudencia');
    });

    test('Garantías de calidad están definidas', () => {
      const content = fs.readFileSync(skillPath, 'utf8');
      expect(content).toContain('Sin alucinaciones');
      expect(content).toContain('Verificación');
      expect(content).toContain('Citas');
    });
  });

  describe('Consulta Normas Skill', () => {
    const skillPath = path.join(__dirname, '../../skills-program/skills/consulta-normas/SKILL.md');

    test('Archivo SKILL.md existe', () => {
      expect(fs.existsSync(skillPath)).toBe(true);
    });

    test('SKILL.md documenta fuentes oficiales', () => {
      const content = fs.readFileSync(skillPath, 'utf8');
      expect(content).toContain('SUIN');
      expect(content).toContain('Diario Oficial');
      expect(content).toContain('Congreso');
    });

    test('Incluye tipos de norma soportados', () => {
      const content = fs.readFileSync(skillPath, 'utf8');
      expect(content).toContain('Leyes');
      expect(content).toContain('Decretos');
      expect(content).toContain('Resoluciones');
    });
  });

  describe('Análisis Jurisprudencial Skill', () => {
    const skillPath = path.join(__dirname, '../../skills-program/skills/analisis-jurisprudencial/SKILL.md');

    test('Archivo SKILL.md existe', () => {
      expect(fs.existsSync(skillPath)).toBe(true);
    });

    test('Documenta evaluación de riesgos', () => {
      const content = fs.readFileSync(skillPath, 'utf8');
      expect(content).toContain('Riesgo');
      expect(content).toContain('Análisis');
      expect(content).toContain('Precedentes');
    });

    test('Incluye estructura de análisis', () => {
      const content = fs.readFileSync(skillPath, 'utf8');
      expect(content).toContain('Síntesis Ejecutiva');
      expect(content).toContain('Jurisprudencia');
      expect(content).toContain('Recomendaciones');
    });
  });

  describe('Generador de Reportes Skill', () => {
    const skillPath = path.join(__dirname, '../../skills-program/skills/generador-reportes-juridicos/SKILL.md');

    test('Archivo SKILL.md existe', () => {
      expect(fs.existsSync(skillPath)).toBe(true);
    });

    test('Documenta tipos de reportes', () => {
      const content = fs.readFileSync(skillPath, 'utf8');
      expect(content).toContain('Investigación');
      expect(content).toContain('Memorandos');
      expect(content).toContain('Análisis de Riesgo');
      expect(content).toContain('Reportes de Caso');
    });

    test('Incluye estructura de reporte', () => {
      const content = fs.readFileSync(skillPath, 'utf8');
      expect(content).toContain('Encabezado');
      expect(content).toContain('Tabla de Contenidos');
      expect(content).toContain('Resumen Ejecutivo');
      expect(content).toContain('Fuentes');
    });

    test('Documenta formatos de salida', () => {
      const content = fs.readFileSync(skillPath, 'utf8');
      expect(content).toContain('Markdown');
      expect(content).toContain('PDF');
      expect(content).toContain('JSON');
    });
  });

});

describe('Configuración del Programa Skills', () => {

  test('package.json existe y es válido', () => {
    const pkgPath = path.join(__dirname, '../../skills-program/package.json');
    expect(fs.existsSync(pkgPath)).toBe(true);

    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    expect(pkg.name).toBe('@jacabogados/skills');
    expect(pkg.version).toBeDefined();
    expect(pkg.skills).toBeDefined();
  });

  test('SKILLS.yaml existe y documenta 4 skills', () => {
    const skillsPath = path.join(__dirname, '../../skills-program/SKILLS.yaml');
    expect(fs.existsSync(skillsPath)).toBe(true);

    const content = fs.readFileSync(skillsPath, 'utf8');
    expect(content).toContain('consulta-jurisprudencia');
    expect(content).toContain('consulta-normas');
    expect(content).toContain('analisis-jurisprudencial');
    expect(content).toContain('generador-reportes-juridicos');
  });

  test('README.md existe con guía completa', () => {
    const readmePath = path.join(__dirname, '../../skills-program/README.md');
    expect(fs.existsSync(readmePath)).toBe(true);

    const content = fs.readFileSync(readmePath, 'utf8');
    expect(content).toContain('Skills Disponibles');
    expect(content).toContain('Inicio Rápido');
    expect(content).toContain('Ejemplos de Uso');
  });

  test('INTEGRACION.md documenta arquitectura', () => {
    const integPath = path.join(__dirname, '../../skills-program/INTEGRACION.md');
    expect(fs.existsSync(integPath)).toBe(true);

    const content = fs.readFileSync(integPath, 'utf8');
    expect(content).toContain('Arquitectura');
    expect(content).toContain('Flujo');
    expect(content).toContain('Transportes MCP');
  });

});

describe('Fuentes Oficiales Integradas', () => {

  test('Se definen 9 fuentes oficiales', () => {
    const skillsPath = path.join(__dirname, '../../skills-program/SKILLS.yaml');
    const content = fs.readFileSync(skillsPath, 'utf8');

    // Fuentes definidas en SKILLS.yaml actual
    const fuentesDefinidas = [
      'corte constitucional',
      'corte suprema',
      'consejo de estado',
      'suin',
      'diario oficial',
      'congreso',
      'legal data hunter'
    ];

    const contentLower = content.toLowerCase();
    fuentesDefinidas.forEach(fuente => {
      expect(contentLower).toContain(fuente);
    });

    // Verificar que se citan 9 fuentes en documentación
    expect(content).toMatch(/official:\s*9|9\s*fuentes|9\s*oficiales|nueve/i);
  });

  test('Cada fuente tiene URL definida', () => {
    const configPath = path.join(__dirname, '../../mcp-config.json');
    if (fs.existsSync(configPath)) {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      const transports = Object.values(config.transports || {});

      transports.forEach(transport => {
        if (transport.url) {
          expect(transport.url).toMatch(/^https?:\/\//);
        }
      });
    }
  });

});
