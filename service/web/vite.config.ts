import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        // Adjust chunk size warning limit (in kbs). Default = 500 kbs
        chunkSizeWarningLimit: 1024
    },
    plugins: [react()],
    resolve: {
        alias: {
            // Absolute Imports using React with Ts and Vite. Check tsconfig.json
        }
    }
})
