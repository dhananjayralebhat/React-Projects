import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import React from 'react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(), react()
  ],
})