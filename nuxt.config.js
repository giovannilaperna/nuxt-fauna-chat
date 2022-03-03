export default {
    // Target: https://go.nuxtjs.dev/config-target
    ssr: false,
    target: 'server',
  
    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
    ],
  
    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
      '~/plugins/v-toolpit.js'
    ],
  
    // Auto import components: https://go.nuxtjs.dev/config-components
    components: {
      dirs: [
        '~/components',
        {
          path  : '~/components/chat',
          prefix: 'Chat'
        }
      ]
    },
  
    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
      // https://go.nuxtjs.dev/eslint
      '@nuxtjs/eslint-module',
    ],
  
    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
      'nuxt-socket-io',
      '@nuxtjs/i18n',
      'nuxt-buefy',
      '@nuxtjs/axios',
      '@nuxtjs/dotenv',
      ['nuxt-cookie-control', {
        colors:{
          barBackground: '#7957d5',
          modalButtonBackground: '#7957d5',
          barButtonHoverBackground: '#BCABEA',
          modalButtonHoverBackground: '#BCABEA', // #6045aa
          checkboxDisabledBackground: '#BCABEA',
          checkboxActiveBackground: '#7957d5',
          checkboxInactiveBackground: '#7957d5'
        },
        controlButton: false,
        locales: ['en', 'es', 'pt', 'ru'],
      }]
    ],

    io: {
      // we could have multiple sockets that we identify with names
      // one of these sockets may have set "default" to true
      sockets: [{
        default: true, // make this the default socket
        name: 'chat', // give it a name that we can later use to choose this socket in the .vue file
        url: 'http://localhost:3001' // URL wherever your socket IO server runs
      }]
    },
  
    cookies: {
      necessary: [
        {
          name: {
            en: "Default cookies",
          },
          description: {
            en: "Used for cookie control, authentication and language setting."
          },
          cookies: [
            "i18n_lang"
          ]
        },
  
      ],
      optional: [
      ]
    },
  
    i18n: {
      baseUrl: process.env.URL,
      locales: [
        {
          code: 'en',
          iso: 'en-US',
          file: 'en.js',
          name: 'English'
        },
        {
          code: 'es',
          iso: 'es-AR',
          file: 'es.js',
          name: 'Español'
        }
      ],
      defaultLocale: 'en',
      detectBrowserLanguage: {
        cookieKey: 'i18n_lang',
        fallbackLocale: 'en'
      },
      vuex: {
        moduleName: 'i18n',
        syncRouteParams: true
      },
      strategy: 'prefix',
      lazy: true,
      langDir: 'lang/',
      seo: false
    },
  
    // https://stackoverflow.com/questions/56966137/how-to-run-nuxt-npm-run-dev-with-https-in-localhost
    axios: {
      debug: (process.env.URL) ? false : true,
      baseURL: (process.env.URL) ? `https://${process.env.URL}` : 'http://localhost:3000',
      https: false,
      proxyHeaders: true
    },
    
    serverMiddleware: [
      { path: '/ws', handler: '~/ws/index.js' }
    ],
  
    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
      postcss: {
        preset: {
          features: {
            customProperties: false
          }
        }
      },
      
      extend(config, { isDev, isClient }) {
        // https://github.com/nuxt-community/dotenv-module/issues/11#issuecomment-376780588
        config.node = {
          fs: 'empty'
        }
      }
    },
  }