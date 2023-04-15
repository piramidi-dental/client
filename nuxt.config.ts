
import eslintPlugin from 'vite-plugin-eslint'
import { Loading } from './types/enums'

export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        { name: 'google', content: 'notranslate' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' },
        { hid: 'description', name: 'description', content: '' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    },
    pageTransition: {
      mode: 'out-in',
      duration: Loading.AnimationDelay
    }
  },

  runtimeConfig: {
    public: {
      strapi: {
        url: '' // can be overridden by NUXT_PUBLIC_STRAPI_URL environment variable
      }
    }
  },

  modules: [
    '@intlify/nuxt3',
    '@nuxtjs/strapi'
  ],

  intlify: {
    localeDir: 'locales',
    vueI18n: {
      locale: 'it',
      fallbackLocale: 'it',
      availableLocales: ['it', 'en']
    }
  },

  css: ['~/assets/scss/main.scss'],

  typescript: {
    strict: true
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "@/assets/scss/tokens/index.scss"; 
            @import "@/assets/scss/utils/index.scss";
            @import "@/assets/scss/common/_var.scss";
            @import "@/assets/scss/common/_export.scss";
            @import "@/assets/scss/ui/index.scss";
          `
        }
      }
    },
    plugins: [eslintPlugin()]
  }
})
