// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  modules: [
    '@pinia/nuxt'
  ],
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL || 'http://localhost:8000'
    }
  },
  vite: {
    css: {
     preprocessorOptions: {
      scss: {
       additionalData: `
            @use "@/assets/scss/_variables.scss" as *;
            `,
      },
     },
    }
  },
  css: [
    'bootstrap/dist/css/bootstrap.css'
  ],
  devtools: { enabled: true }
})
