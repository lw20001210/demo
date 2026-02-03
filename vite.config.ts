import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import type { ConfigEnv, UserConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],

    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@utils': path.resolve(__dirname, 'src/utils'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@types': path.resolve(__dirname, 'src/types'),
        '@constants': path.resolve(__dirname, 'src/constants'),
        '@services': path.resolve(__dirname, 'src/services'),
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@styles': path.resolve(__dirname, 'src/styles'),
      },
    },

    server: {
      port: Number(env.VITE_APP_PORT) || 5173,
      host: true,
      open: true,
      proxy: {
        '/api': {
          target: env.VITE_APP_BASE_API,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },

    build: {
      outDir: 'dist',
      sourcemap: mode === 'development',
      minify: 'esbuild',
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            antd: ['antd'],
            i18n: ['i18next', 'react-i18next'],
          },
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: '[ext]/[name]-[hash].[ext]',
        },
      },
      chunkSizeWarningLimit: 1000,
    },

    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: {},
        },
      },
      modules: {
        localsConvention: 'camelCase',
      },
    },

    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger'] : [],
    },
  };
});
