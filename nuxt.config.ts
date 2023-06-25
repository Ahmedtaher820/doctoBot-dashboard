import { RuntimeConfig } from 'nuxt/schema';
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app:{
    head:{
      meta:[{
        name:'viewport',content:'width=device-width, initial-scale=1'
      }],
      links:[{ rel: 'icon', type: 'image/x-icon', href: '/logo.svg' }]

    },
    
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
