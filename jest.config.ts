/** @type {import('ts-jest').JestConfigWithTsJest} **/

export default {
  collectCoverage: true,
  collectCoverageFrom: [
    "./src/**/*.{ts,tsx}",
    "!**/*.d.ts",
    "!./src/types/*.ts",
    "!./src/main.tsx"
  ],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  coverageThreshold: {
    "global": {
      "statements": 0,
      "branches": 0,
      "functions": 0,
      "lines": 0
    }
  },
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    "^/vite.svg$": "<rootDir>/public/vite.svg",
  },
  setupFilesAfterEnv: [
    "<rootDir>/setupTests.ts"
  ],
  testEnvironment: "jest-fixed-jsdom",
  transform: {
    "^.+.tsx?$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.test.json",
        diagnostics: {
          ignoreCodes: [1343]
        },
        astTransformers: {
          before: [
            {
              path: 'ts-jest-mock-import-meta',
              options: { metaObjectReplacement: { env: {} } }
            }
          ]
        }
      }
    ],
    "^.+\\.svg$": "<rootDir>/svgTransformer.js",
  }
};