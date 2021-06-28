module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'pet-nuxt-js',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */

  axios: {
    baseURL:"https://pet-rescue-api-haolt.herokuapp.com/api/v1",
  },

  plugins: ['~/plugins/error.js'],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/toast',
    'nuxt-i18n',
    'bootstrap-vue/nuxt'
  ],

  i18n: {
    langDir: 'locales/',
    locales: [
      { code: 'en', file: 'en.json', iso: 'en'}
    ],
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
    }
  },

  toast: {
    position: 'top-center',
  },

  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

