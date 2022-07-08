import { defineNuxtConfig } from 'nuxt'
import eslintPlugin from 'vite-plugin-eslint'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'google', content: 'notranslate' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap' }
    ]
  },

  css: ['~/assets/scss/main.scss'],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "@/assets/scss/tokens/index.scss"; 
            @import "@/assets/scss/utils/index.scss";
          `
        }
      }
    },
    plugins: [eslintPlugin()]
  },

  typescript: {
    strict: true
  }
})
