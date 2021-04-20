import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  // --- fxcisco
  // collectCoverage: true,
  // collectCoverageFrom: [ '<rootDir>/src/**/*.ts' ],
  // ---

  clearMocks: true,
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: [
    "<rootDir>/node_modules/(?!@foo)"
  ],
  globals: {
    "ts-jest": {
      "tsconfig": "tsconfig.json",
      "diagnostics": true
    }
  },

  moduleFileExtensions: [
    "ts",
    "tsx",
    "js"
  ],

  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1"
  },
  testEnvironment: "node",
  testRegex: "(/tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  transformIgnorePatterns: [
    "<rootDir>/node_modules/(?!@foo)"
  ]
}

export default config;