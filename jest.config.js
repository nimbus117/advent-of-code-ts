/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

// eslint-disable-next-line
const { compilerOptions  } = require('./tsconfig')
// eslint-disable-next-line
const { pathsToModuleNameMapper  } = require('ts-jest')

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>'],
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
};
