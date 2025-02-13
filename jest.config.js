export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx)$': ['babel-jest', { configFile: './babel.config.js' }],
  },
  testEnvironmentOptions: {
    url: 'http://localhost',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/src/styleMock.js',
  },
  testMatch: ['**/*.test.js'],
  moduleFileExtensions: ['js', 'json', 'node', 'svg'],
  transformIgnorePatterns: ['/node_modules/', '\\.pnp\\.[^\\/]+$'],
};
