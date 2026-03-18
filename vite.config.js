import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  // REPLACE 'your-repo-name' with the name of your GitHub repository
  base: '/SharedAttendance/', 
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
})