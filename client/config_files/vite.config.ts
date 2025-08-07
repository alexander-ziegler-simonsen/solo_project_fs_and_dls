import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths"


const port:number =  parseInt(process.env.VITE_CLIENT_PORT || '8083', 10)

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  build: {
    outDir: "dist"
  },
  server: {port}
})
