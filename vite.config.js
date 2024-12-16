import path from 'path';
import react from '@vitejs/plugin-react';

export default {
  plugins: [react()],
  assetsInclude: ['**/*.lottie'],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@css': path.resolve(__dirname, './src/assets/css'),
      '@scss': path.resolve(__dirname, './src/assets/scss'),
      '@images': path.resolve(__dirname, './src/assets/images'),
      '@fonts': path.resolve(__dirname, './src/assets/fonts'),
      '@components': path.resolve(__dirname, './src/components'),
    },
    extensions: ['.js', '.jsx', '.scss'], 
  },
  build: {
    outDir: 'build',
    target: 'esnext', 
    minify: 'esbuild', 
    sourcemap: false, 
  },
  cacheDir: path.resolve(__dirname, '.vite_cache'), // 캐시 디렉토리 설정
  server: {
    port: 3000, 
  }
};
