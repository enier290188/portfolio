import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        // Adjust chunk size warning limit (in kbs). Default = 500 kbs
        chunkSizeWarningLimit: 1024,
    },
    plugins: [react()],
    resolve: {
        alias: {
            // Absolute Imports using React with Ts and Vite. Check tsconfig.json
            '@./app': path.resolve(__dirname, './src/app'),
            '@./package/material-ui': path.resolve(__dirname, './src/package/material-ui'),
        },
    },
})
