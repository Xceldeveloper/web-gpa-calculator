import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - xcel gpa calculator',
    title: 'xcel gpa calculator | designed by Xceldeveloper',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport',   content: 'width=device-width, initial-scale=1,user-scalable=no'},
      { hid: 'description', name: 'description', content: '' }
    ],
    noscript: [{
      innerHTML: 'This Web application requires JavaScript Please Turn it on From Browser Settings.'
    }],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icon.jpg' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~/assets/materialdesignicons.min.css',
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/pwa'
  ],

  pwa: {
    manifest: {
      name: 'Xcel GPA Calculator',
      short_name: 'XGPA calculator',
      lang: 'en',
      display: 'standalone',
      theme_color: '#002857',
      background_color: '#ffffff',
      "orientation": "portrait",
      start_url: '/',
      mobileAppIOS: true
    }
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
