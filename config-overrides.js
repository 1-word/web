// config-overrides.js
const path = require("path");

module.exports = function override(config, env) {
  // 웹팩의 resolve 객체를 수정합니다.
  config.resolve = {
    ...config.resolve,
    extensions: ['.js', '.jsx', '.json', '.css', '.scss'],
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@css": path.resolve(__dirname, "./src/assets/css"),
      "@scss": path.resolve(__dirname, "./src/assets/scss"),
      "@images": path.resolve(__dirname, "./src/assets/images"),
      "@fonts": path.resolve(__dirname, "./src/assets/fonts"),
      "@components": path.resolve(__dirname, "./src/components")
    },
  };

  return config;
};
