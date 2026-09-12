/**
 * Jest Setup - Configuración global para tests
 *
 * Se ejecuta antes de cada suite de tests
 */

// Aumentar timeout para tests que requieren I/O
jest.setTimeout(10000);

// Suprimir logs durante tests (opcional)
global.console = {
  ...console,
  // log: jest.fn(),      // Descomentar para suprimir console.log
  // debug: jest.fn(),    // Descomentar para suprimir console.debug
  // info: jest.fn(),     // Descomentar para suprimir console.info
  // warn: jest.fn(),     // Descomentar para suprimir console.warn
};

// Variables de entorno para tests
process.env.NODE_ENV = 'test';
process.env.TEST_TIMEOUT = 10000;
