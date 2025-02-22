

// // https://vite.dev/config/
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react-swc';

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://localhost:3000', // Redirect API requests to backend
//         changeOrigin: true,
//       },
//     },
//   },
//   build: {
//     chunkSizeWarningLimit: 1000, // Increase the chunk size limit to avoid warnings
//   },
// });


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Used in development
        changeOrigin: true,
      },
    },
  },
  define: {
    __API_BASE_URL__: JSON.stringify('https://home-rental-realestate-api.vercel.app/api'),
  },
  build: {
    chunkSizeWarningLimit: 1000,
  },
});
