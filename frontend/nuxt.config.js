const { FRONTEND_API_SERVER_URL, FRONTEND_API_BROWSER_URL } = process.env;

export default {
  head: {
    title: 'ДоставкаHUB',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  buildModules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/device'
  ],

  modules: [
    '@nuxtjs/axios',
  ],

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: { dark: false }
  },

  device: {
    refreshOnResize: true
  },

  axios: {
    baseUrl: FRONTEND_API_SERVER_URL + '/api/v1',
    browserBaseUrl: FRONTEND_API_BROWSER_URL + '/api/v1',
  }
}
