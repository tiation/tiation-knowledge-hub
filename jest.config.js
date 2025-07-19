module.exports = {
  projects: [
    {
      displayName: 'client',
      testMatch: ['<rootDir>/client/**/*.test.{js,jsx,ts,tsx}'],
      testEnvironment: 'jsdom',
      setupFilesAfterEnv: ['<rootDir>/client/src/setupTests.ts'],
      moduleNameMapping: {
        '^@/(.*)$': '<rootDir>/client/src/$1',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
      },
      transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
      },
      collectCoverageFrom: [
        'client/src/**/*.{ts,tsx}',
        '!client/src/**/*.d.ts',
        '!client/src/main.tsx',
        '!client/src/vite-env.d.ts',
      ],
    },
    {
      displayName: 'server',
      testMatch: ['<rootDir>/server/**/*.test.{js,ts}'],
      testEnvironment: 'node',
      setupFilesAfterEnv: ['<rootDir>/server/src/setupTests.ts'],
      moduleNameMapping: {
        '^@/(.*)$': '<rootDir>/server/src/$1',
      },
      transform: {
        '^.+\\.ts$': 'ts-jest',
      },
      collectCoverageFrom: [
        'server/src/**/*.ts',
        '!server/src/**/*.d.ts',
        '!server/src/index.ts',
      ],
    },
    {
      displayName: 'shared',
      testMatch: ['<rootDir>/shared/**/*.test.{js,ts}'],
      testEnvironment: 'node',
      moduleNameMapping: {
        '^@/(.*)$': '<rootDir>/shared/src/$1',
      },
      transform: {
        '^.+\\.ts$': 'ts-jest',
      },
      collectCoverageFrom: [
        'shared/src/**/*.ts',
        '!shared/src/**/*.d.ts',
      ],
    },
  ],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};