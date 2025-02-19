import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from "vite-plugin-svgr";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(
      {
        jsxImportSource: "@emotion/react",
      }
    ),
    svgr()
  ],
  server: {
    port: 3000,
    proxy: {
      "/api": "http://localhost:5000"
    },
    watch: {
      ignored: [path.resolve(__dirname, './coverage')]
    }
  }
});
