import type { JestConfigWithTsJest } from "ts-jest";

export const config: JestConfigWithTsJest = {
  testEnvironment: "jsdom",
  preset: "ts-jest",
  rootDir: "./src",
  moduleFileExtensions: ["ts", "tsx", "js"],
  testMatch: ["<rootDir>/**/*.test.ts", "<rootDir>/**/*.test.tsx"],
};

export default config;
