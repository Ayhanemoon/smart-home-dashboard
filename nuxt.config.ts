// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
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
