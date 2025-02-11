/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  collectCoverage: true,
  collectCoverageFrom: [
    "./src/**/*.{ts,tsx}",
    "!**/*.d.ts",
    "!./src/types/*.ts"
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
  setupFilesAfterEnv: [
    "<rootDir>/setupTests.ts"
  ],
  testEnvironment: "jsdom",
  transform: {
    "^.+.tsx?$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.app.json"
      }
    ],
  }
};