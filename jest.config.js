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
  collectCoverageFrom: [
    'tests/unit/**/*.js'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html', 'json-summary'],
  coverageThreshold: {},
  verbose: true,
  testTimeout: 10000,
  bail: true,
  maxWorkers: '50%',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js']
};
