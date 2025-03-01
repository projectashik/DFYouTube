import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import webExtension from 'vite-plugin-web-extension';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');

  // Use a deterministic seed for builds in CI environments
  const deterministicSeed = env.VITE_RANDOM_SEED || Date.now().toString();

  // Determine which manifest to use based on mode
  let manifestPath = 'public/manifest.json';
  if (mode === 'firefox') {
    manifestPath = 'public/manifest.firefox.json';
  } else if (mode === 'firefox-v2') {
    manifestPath = 'public/manifest.firefox.v2.json';
  } else if (mode === 'chrome') {
    manifestPath = 'public/manifest.json';
  }

  console.log(`Building for mode: ${mode}, using manifest: ${manifestPath}`);

  return {
    // Vite config
    plugins: [
      react(),
      webExtension({
        manifest: manifestPath,
      }),
    ],
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      rollupOptions: {
        // Use a deterministic seed for content hashing
        output: {
          manualChunks: undefined,
        },
      },
    },
    // Provide a custom implementation of crypto.getRandomValues if needed
    define: {
      __DETERMINISTIC_SEED__: JSON.stringify(deterministicSeed),
    },
    optimizeDeps: {
      include: ['crypto-polyfill'],
    },
    resolve: {
      alias: {
        crypto: resolve(__dirname, 'crypto-polyfill.js'),
      },
    },
  };
});