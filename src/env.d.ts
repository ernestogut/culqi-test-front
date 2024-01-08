/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_API_URL: string;
    // Agrega aquí cualquier otra variable de entorno que necesites
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}