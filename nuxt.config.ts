export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  ssr: false,
  modules: ["@unocss/nuxt"],
  css: ["@unocss/reset/tailwind.css", "~/assets/css/main.css"],
  app: {
    head: {
      title: "MyCode",
      htmlAttrs: { lang: "zh-CN" },
    },
  },
});
