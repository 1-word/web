import path from 'path';
import react from '@vitejs/plugin-react';
import {VitePWA} from 'vite-plugin-pwa'

export default {
  plugins: [
    react(),  
    VitePWA({ 
    registerType: 'autoUpdate',
    includeAssets: ['favicon.ico', 'favicon/apple-touch-icon.png', 'favicon/favicon.svg'],
    manifest: {
        "name": "VocaBox",
        "short_name": "VocaBox",
        "icons": [
          {
            "src": "/favicon/web-app-manifest-192x192.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "any"
          },
          {
            "src": "/favicon/web-app-manifest-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "any"
          }
        ],
        "theme_color": "#ffffff",
        "background_color": "#4A4453",
        "display": "standalone",
        },
        workbox: {
          maximumFileSizeToCacheInBytes: 7000000, // 7MB로 설정 (필요한 크기에 맞게 조절)
          navigateFallback: null, // 리디렉트 방지
          navigateFallbackDenylist: [
              /manifest\.json/, 
              /^https:\/\/.*\.com\/oauth\//,  // OAuth 로그인 URL 자동 예외 처리
              /^https:\/\/accounts\.google\.com\//,
              /^https:\/\/kauth\.kakao\.com\//,
              /^https:\/\/nid\.naver\.com\//
          ]
        }
      })
],
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
    host: '0.0.0.0'
  }
};
