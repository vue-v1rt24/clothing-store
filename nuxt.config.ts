// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/image',
    '@pinia/nuxt',
    '@prisma/nuxt',
    'nuxt-nodemailer',
    '@outloud/nuxt-modals',
    'nuxt-file-storage',
  ],

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

  // Работа с изображениями / @nuxt/image
  image: {
    domains: [process.env.NUXT_PUBLIC_DOMAINS],
  },

  // Отправка почты / nuxt-nodemailer
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

  // Модальное окно / @outloud/nuxt-modals
  modals: {},

  // Загрузка изображений / nuxt-file-storage
  fileStorage: {
    mount: process.cwd() + process.env.PATH_SAVE_FILE_IMAGES,
  },
});
