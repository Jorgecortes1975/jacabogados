/**
 * Jest Configuration - Programa Skills JAC
 *
 * Configuración de testing para suite de tests unitarios,
 * integración y auditoría de sentencias
 */

module.exports = {
  displayName: 'JAC-Skills',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
  collectCoverageFrom: [],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  coverageThreshold: {},
  verbose: true,
  testTimeout: 10000,
  bail: true,
  maxWorkers: '50%',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js']
};
