/* eslint-env node */
/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */
module.exports = {
  transform: {
    "^.+\\.tsx?$": ["ts-jest", {tsconfig: `./tsconfig.json`}],
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  testTimeout: 60000,
  testMatch: ["<rootDir>/__tests__/**/*.ts"],
  watchman: false,
};
