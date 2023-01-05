/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
import path from 'path'
import {fileURLToPath} from 'url'
const __dirname = fileURLToPath(import.meta.url)

export default {
  rootDir: path.join(__dirname, '..'),
  collectCoverageFrom: ['**/src/**/*.ts'],
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['**/src/__tests__/**/*.ts'],
  displayName: '😸',
}
