export default defineNuxtConfig({
  ssr: false,
  router: {
    options: {
      hashMode: true
    }
  },
  modules: ['@nuxt/ui', 'nuxt-swiper'],
  colorMode: {
    preference: 'light'
  },
  compatibilityDate: '2024-09-30'
})
