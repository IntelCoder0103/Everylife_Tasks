/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  // to obtain access to the matchers.
  setupFilesAfterEnv: ["./tests/setupTests.ts"],
  moduleNameMapper: {
    "^.+\\.(jpg|jpeg|png|gif|svg|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/tests/mocks/fileMock.ts",
    "@/(.*)": "<rootDir>/src/$1",
  },
};