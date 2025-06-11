// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxt/image', '@pinia/nuxt', '@prisma/nuxt', 'nuxt-nodemailer'],

  //
  runtimeConfig: {
    // JWT токены
    jwtTokenAccess: process.env.NUXT_JWT_TOKEN_ACCESS,
    jwtTokenRefresh: process.env.NUXT_JWT_TOKEN_REFRESH,
  },

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

  //
  nodemailer: {
    from: '"John Doe" <v1rt24@yandex.ru>',
    host: process.env.NUXT_MAIL_HOST,
    port: Number(process.env.NUXT_MAIL_PORT),
    secure: true,
    auth: {
      user: process.env.NUXT_MAIL_USER,
      pass: process.env.NUXT_MAIL_PASSWORD,
    },
  },
});
