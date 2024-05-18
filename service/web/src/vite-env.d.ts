/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_SERVICE_API_PROTOCOL: string
    readonly VITE_SERVICE_API_DOMAIN: string
    readonly VITE_SERVICE_API_PORT_EXTERNAL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
