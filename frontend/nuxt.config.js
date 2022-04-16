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
  }
}
