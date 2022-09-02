import colors from 'vuetify/lib/util/colors';

const { FRONTEND_API_URL, FRONTEND_SOCKET_URL, FRONTEND_BUGSNAG_KEY, FRONTEND_ENV } = process.env;

function optional(isEnabled, ...module) {
    return isEnabled ? [module] : [];
}

const BROWSERSLIST = [
    'last 4 chrome version',
    'last 4 firefox version',
    'last 4 edge version',
    'last 1 and_chr version',
    'ios_saf >= 14.5',
    'Safari >= 13.1',
    'Firefox ESR',
    'not dead'
];

export default {
    ssr: false,
    target: 'static',

    head: {
        title: 'DeliveryHelp',

        htmlAttrs: { lang: 'ua' },

        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' }
        ],

        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },

    build: {
        extractCSS: true,

        babel: {
            presets({ isServer }, [ preset, options ]) {
                if (!isServer && preset.includes('@nuxt/babel-preset-app')) {
                    options.targets = { browsers: BROWSERSLIST };
                }
            }
        }
    },

    buildModules: [
        '@nuxtjs/vuetify',
        '@nuxtjs/device'
    ],

    modules: [
        '@nuxtjs/axios',
        'nuxt-socket-io',
        ['@nuxtjs/toast', { duration: 5000 }],

        ...optional(FRONTEND_BUGSNAG_KEY, 'nuxt-bugsnag', {
            apiKey: FRONTEND_BUGSNAG_KEY,
            releaseStage: FRONTEND_ENV,
            publishRelease: true
        })
    ],

    plugins: [
        '~/plugins/axios',
        { src: '~/plugins/api-socket', mode: 'client' }
    ],

    server: {
        port: 8080,
        host: '0.0.0.0'
    },

    router: { middleware: 'auth' },
    css: ['~/styles/global.css'],

    vuetify: {
        theme: {
            dark: false,
            themes: {
                light: { primary: colors.indigo.base }
            }
        },
        icons: { iconfont: 'mdiSvg', },
        defaultAssets: { icons: false }
    },

    device: { refreshOnResize: true },

    axios: {
        baseUrl: FRONTEND_API_URL + '/v1',
        credentials: true
    },

    io: {
        sockets: [
            {
                default: true,
                name: 'api',
                url: FRONTEND_SOCKET_URL
            }
        ]
    }
};
