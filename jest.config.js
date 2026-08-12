/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "mjs",
    "cjs",
    "jsx",
    "json",
    "node"
  ],
  preset: "ts-jest",
  testEnvironment: "node",
};

module.exports = config;
