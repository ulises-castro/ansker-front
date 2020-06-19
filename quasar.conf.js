// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js
const path = require('path')
const fs = require('fs')

const CopyWebpackPlugin = require('copy-webpack-plugin')

const BackUrl = (!false) ? 'https://localanskerme.me:3030/v1/' : 'https://192.168.0.160:3030/v1/'

module.exports = function (ctx) {
  return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://quasar.dev/quasar-cli/cli-documentation/boot-files
    boot: [
      'i18n',
      'axios',
      'vant',
      'components'
    ],

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-css
    css: [
      'app.scss',
    ],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      // 'mdi-v4',
      // 'eva-icons',
      // 'themify',
      // 'line-awesome',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!
      // 'roboto-font', // optional, you are not bound to it
      'themify',
      'ionicons-v4',
      'line-awesome',
      'material-icons', // optional, you are not bound to it
      'fontawesome-v5'
    ],

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework
    framework: {
      iconSet: 'material-icons', // Quasar icon set
      lang: 'en-us', // Quasar language pack

      // Possible values for "all":
      // * 'auto' - Auto-import needed Quasar components & directives
      //            (slightly higher compile time; next to minimum bundle size; most convenient)
      // * false  - Manually specify what to import
      //            (fastest compile time; minimum bundle size; most tedious)
      // * true   - Import everything from Quasar
      //            (not treeshaking Quasar; biggest bundle size; convenient)
      all: 'auto',

      components: [],
      directives: [],

      // Quasar plugins
      plugins: []
    },

    // https://quasar.dev/quasar-cli/cli-documentation/supporting-ie
    supportIE: false,

    // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-build
    build: {
      vueRouterMode: ctx.dev ? 'hash' : 'history', // available values: 'hash', 'history'
      // publicPath: '/',
      env: ctx.dev ? { // so on dev we'll have
        API: JSON.stringify(BackUrl),
        GOOGLE_ID: JSON.stringify(
          '1068324984301-fvmom0kcuv76qerlo8comedb0c2iaqgu.apps.googleusercontent.com'),
        SOCKET: JSON.stringify('https://localanskerme.me:3030'),
        BASE_URL: JSON.stringify('https://localanskerme.me:1297')
      } : { // and on build (production):
        API: JSON.stringify('https://api.ansker.me/v1/'),
        GOOGLE_ID: JSON.stringify(
          '1068324984301-fvmom0kcuv76qerlo8comedb0c2iaqgu.apps.googleusercontent.com'),
        SOCKET: JSON.stringify('https://ansker.me:3030'),
        BASE_URL: JSON.stringify('https://ansker.me')
      },

      // rtl: false, // https://quasar.dev/options/rtl-support
      // showProgress: false,
      // gzip: true,
      // analyze: true,
      modern: true,

      // Options below are automatically set depending on the env, set them if you want to override
      // preloadChunks: false,
      // extractCSS: false,

      // https://quasar.dev/quasar-cli/cli-documentation/handling-webpack
      extendWebpack(cfg) {
        cfg.plugins.push(new CopyWebpackPlugin([{ from: 'src/public/', to: '' }]))

        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/,
          options: {
            formatter: require('eslint').CLIEngine.getFormatter('stylish')
          }
        })

        cfg.resolve.alias = {
          ...cfg.resolve.alias,
          '@': path.resolve(__dirname, 'src'),
        }
      }
    },

    // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-devServer
    devServer: {
      https: {
        key: fs.readFileSync('/home/alex/ssl/mydev.dev+5-key.pem'),
        cert: fs.readFileSync('/home/alex/ssl/mydev.dev+5.pem'),
        ca: fs.readFileSync('/home/alex/.local/share/mkcert/rootCA.pem'),
      },
      host: "0.0.0.0",
      // https: false,
      port: 1297,
      open: false, // opens browser window automatically
      // This isn't recommed due to DNS direct atackking
      disableHostCheck: true,
    },

    // animations: 'all', // --- includes all animations
    // https://quasar.dev/options/animations
    animations: [],

    // https://quasar.dev/quasar-cli/developing-ssr/configuring-ssr
    ssr: {
      pwa: false
    },

    // https://quasar.dev/quasar-cli/developing-pwa/configuring-pwa
    pwa: {
      workboxPluginMode: 'InjectManifest', // 'GenerateSW' or 'InjectManifest'
      workboxOptions: {}, // only for GenerateSW
      manifest: {
        name: 'Ansker | Comparte con tu alreadedor',
        short_name: 'Ansker',
        description: 'Comparte lo que piensas con tu alrededor de forma fácil, anónima y divertida.',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        gcm_sender_id: '989384809387',
        icons: [{
            src: 'statics/icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png'
          },
          {
            src: 'statics/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'statics/icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png'
          },
          {
            src: 'statics/icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png'
          },
          {
            src: 'statics/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ],
      },
      metaVariables: {
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'default',
        appleTouchIcon120: 'statics/icons/apple-icon-120x120.png',
        appleTouchIcon180: 'statics/icons/apple-icon-180x180.png',
        appleTouchIcon152: 'statics/icons/apple-icon-152x152.png',
        appleTouchIcon167: 'statics/icons/apple-icon-167x167.png',
        appleSafariPinnedTab: 'statics/icons/safari-pinned-tab.svg',
        msapplicationTileImage: 'statics/icons/ms-icon-144x144.png',
        msapplicationTileColor: '#000000'
      },
      metaVariablesFn (manifest) {
        return [
          {
            // this entry will generate:
            // <meta name="theme-color" content="ff0">
            tagName: 'meta',
            attributes: {
              name: 'theme-color',
              content: '#54a0c0'
            }
          },
          {
            // this entry will generate:
            // <link rel="apple-touch-icon" sizes="180x180" href="statics/icon-180.png">

            tagName: 'link',
            attributes: {
              rel: 'apple-touch-icon',
              sizes: '180x180',
              href: 'statics/icon-180.png'
            },
            closeTag: false // this is optional;
                            // specifies if tag also needs an explicit closing tag;
                            // it's Boolean false by default
          }
        ]
      }
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-cordova-apps/configuring-cordova
    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
      id: 'org.cordova.quasar.app'
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      hideSplashscreen: true
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-electron-apps/configuring-electron
    electron: {
      bundler: 'packager', // 'packager' or 'builder'

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration
        appId: 'ansker'
      },

      // More info: https://quasar.dev/quasar-cli/developing-electron-apps/node-integration
      nodeIntegration: true,

      extendWebpack(cfg) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
      }
    }
  }
}
