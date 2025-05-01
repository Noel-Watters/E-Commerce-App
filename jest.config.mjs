export default {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["@testing-library/jest-dom", "<rootDir>/jest.setup.js"],
  transform: {
    "^.+\\.[tj]sx?$": [
      "babel-jest",
      { presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"] }
    ],
  },
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  transformIgnorePatterns: ["node_modules/(?!react-bootstrap|other-esm-dependency)"],
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
  setupFiles: ["<rootDir>/jest.setup.js"], // Path to your setup file
  moduleNameMapper: {
    "^../firebase/firebaseConfig$": "<rootDir>/src/__mocks__/firebaseConfig.ts", // Map firebaseConfig to the mock
  },
};