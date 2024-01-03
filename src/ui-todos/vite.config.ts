import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import NodeGlobalsPolyfillPlugin from '@esbuild-plugins/node-globals-polyfill';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        host: true,
        port: 33000, // This is the port which we will use in docker
    },
    plugins: [react(), nodePolyfills(),]
})
