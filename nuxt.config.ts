// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxt/image'],

  //
  runtimeConfig: {},

  //
  app: {
    head: {
      htmlAttrs: {
        lang: 'ru',
      },
    },
  },

  css: ['assets/css/index.css'],

  //
  experimental: {
    typedPages: true,
  },

  //
  router: {
    options: {
      linkActiveClass: 'active',
      linkExactActiveClass: 'active',
    },
  },

  /* Настройка плагинов */

  // image: {},
});
