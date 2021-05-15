module.exports = {
  roots: [
    '<rootDir>/src',
  ],
  moduleNameMapper: {
    '@interfaces(.*)$': '<rootDir>/src/interfaces$1',
  },
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};
