/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_SERVICE_WEB_SERVER_API: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
