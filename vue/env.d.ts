/// <reference types="vite/client" />
/// <reference types="vite/client" />
interface ImportMetaEnv {
  VITE_PUBLIC_CLOUDINARY_CLOUD_NAME: string
  VITE_PUBLIC_CLOUDINARY_API_KEY: string
  VITE_PUBLIC_CLOUDINARY_API_SECRET: string
  VITE_PUBLIC_CLOUDINARY_FOLDER: string
  VITE_PUBLIC_API_BASE_URL: string
  VITE_PUBLIC_APP_BASE_URL: string
  VITE_PUBLIC_CLOUDINARY_UPLOAD_PRESET: string
  VITE_PUBLIC_MAX_FILE_SIZE: number
  VITE_PUBLIC_API_BASE_URL_PARSE: string
  PORT: number
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
