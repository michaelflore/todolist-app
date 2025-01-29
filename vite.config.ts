import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(
    {
      jsxImportSource: "@emotion/react",
    }
  )],
  server: {
    port: 3000,
    proxy: {
      "/api": "http://localhost:5000"
    }
  }
})
