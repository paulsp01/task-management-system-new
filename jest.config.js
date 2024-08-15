module.exports = {
  preset: "ts-jest", // If you're using TypeScript, otherwise you can remove this
  testEnvironment: "node",
  rootDir: "./", // Root of your project
  transform: {
    "^.+\\.tsx?$": "ts-jest", // If using TypeScript
    "^.+\\.jsx?$": "babel-jest", // If using JavaScript/JSX
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{ts,tsx,js,jsx}"], // Collect coverage from source files
  coverageDirectory: "coverage", // Directory where coverage reports are stored
  coveragePathIgnorePatterns: ["/node_modules/", "/dist/"], // Ignore certain directories
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Alias for src/ directory
  },
  testMatch: [
    "**/tests/**/*.+(ts|tsx|js|jsx)", // Match test files in the tests directory
    "**/?(*.)+(spec|test).+(ts|tsx|js|jsx)", // Match test files with .test or .spec suffix
  ],
  setupFiles: ["<rootDir>/.env"], // Load environment variables from .env
};
