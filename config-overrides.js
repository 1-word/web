// config-overrides.js
const path = require("path");

module.exports = function override(config, env) {
  // 웹팩의 resolve 객체를 수정합니다.
  config.resolve = {
    ...config.resolve,
    alias: {
      // 예시: "@css" alias를 "src/css"로 설정
      "@css": path.resolve(__dirname, "src/css"),
      "@components": path.resolve(__dirname, "src/wordPaper/Component"),
    },
  };

  return config;
};
