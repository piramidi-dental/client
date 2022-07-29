import { defineNuxtConfig } from 'nuxt'
import eslintPlugin from 'vite-plugin-eslint'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  publicRuntimeConfig: {
    baseUrl: process.env.BASE_URL
  },

  buildModules: [
    '@nuxt3/graphql-codegen-module',
    '@nuxt3/apollo-module',
    '@pinia/nuxt'
  ],

  graphqlCodegen: {
    schema: [process.env.BASE_URL]
  },

  apollo: {
    clientConfigs: {
      default: {
        uri: process.env.BASE_URL
      }
    }
  },

  css: ['~/assets/scss/main.scss'],

  typescript: {
    strict: true
  },

  types: [
    '@pinia/nuxt'
  ],

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
