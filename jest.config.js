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
    'skills-program/**/*.js',
    'tests/**/*.js',
    '!node_modules/**',
    '!**/node_modules/**'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  },
  verbose: true,
  testTimeout: 10000,
  bail: true,
  maxWorkers: '50%',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js']
};
