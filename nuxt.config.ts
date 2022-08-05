import { defineNuxtConfig } from 'nuxt'
import eslintPlugin from 'vite-plugin-eslint'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBase: ''
    }
  },

  buildModules: [
    '@intlify/nuxt3'
  ],

  intlify: {
    localeDir: 'locales',
    vueI18n: {}
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
          `
        }
      }
    },
    plugins: [eslintPlugin()]
  }
})
