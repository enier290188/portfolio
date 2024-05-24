import react from '@vitejs/plugin-react'
import * as path from 'path'
import { defineConfig } from 'vite'

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
            '@./app/page/': path.resolve(__dirname, './src/app/page/'),
            '@./package/material-ui': path.resolve(__dirname, './src/package/material-ui'),
            '@./package/react-error-boundary': path.resolve(__dirname, './src/package/react-error-boundary'),
            '@./package/react-hook-form': path.resolve(__dirname, './src/package/react-hook-form'),
            '@./package/react-image-crop': path.resolve(__dirname, './src/package/react-image-crop'),
            '@./package/react-router': path.resolve(__dirname, './src/package/react-router'),
            '@./package/tanstack-react-query': path.resolve(__dirname, './src/package/tanstack-react-query'),
            '@./package/tanstack-react-query-devtools': path.resolve(__dirname, './src/package/tanstack-react-query-devtools'),
            '@./package/tanstack-react-table': path.resolve(__dirname, './src/package/tanstack-react-table'),
        },
    },
})
