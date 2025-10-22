module.exports = {
  ignorePatterns: ["apps/**", "packages/**"],
  extends: ["@repo/eslint-config"],
  parserOptions: {
    project: true,
  },
};