import { defineConfig } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: 'dist/stats.html',
      open: true
    })
  ],
  resolve: {
    alias: [{ find: '~', replacement: '/src' }]
  },
  server: {
    historyApiFallback: true
  }
})
