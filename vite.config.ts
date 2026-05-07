import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  return {
    base: env.VITE_GLOB_PUBLIC_PATH,
    plugins: [react()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      host: true,
      port: Number(env.VITE_PORT),
      proxy: {
        [env.VITE_GLOB_BASE_API]: {
          target: 'https://www.apisorcery.com/demo-api/', // Prod
          // target: 'http://localhost:9005/', // Local
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp(`^${env.VITE_GLOB_BASE_API}`), ''),
        },
      },
    },
  };
});
