import { RuntimeConfig } from 'nuxt/schema';
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app:{
    head:{
      charset:'utf-8',
      viewport: 'width=device-width, initial-scale=1'
    }
  },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-headlessui',
    '@nuxtjs/color-mode',
    '@pinia/nuxt'

  ],
  headlessui: {
    prefix: 'Headless'
},
colorMode: {
  classSuffix: ''
},
css:['assets/main.css'],
runtimeConfig: {
  apiUrl: process.env.BASE_URL,
  public: {
    apiUrl: process.env.BASE_URL,
  },
},
// components: [
//   {
//     path: '~/components',
//      pathPrefix: false,
//   },
// ],
  // build: {
  //   transpile: ['@headlessui/vue'],
  // },
})
