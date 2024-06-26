import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/react-topmodel/',
  server: {
    proxy: {
      '/api': {
        target: 'https://react-topmodel.onrender.com',
        changeOrigin: true,
        secure: false,
      }
    }
  },
})
