import colors from 'vuetify/lib/util/colors';

const { FRONTEND_API_URL, FRONTEND_SOCKET_URL, FRONTEND_BUGSNAG_KEY, FRONTEND_ENV } = process.env;

export default {
    ssr: false,
    target: 'static',

    head: {
        title: 'ВолонтерВантаж',

        htmlAttrs: { lang: 'ua' },

        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' }
        ],

        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },

    build: { extractCSS: true },

    buildModules: [
        '@nuxtjs/vuetify',
        '@nuxtjs/device'
    ],

    modules: [
        '@nuxtjs/axios',
        ['@nuxtjs/toast', { duration: 5000 }]
    ],

    plugins: [
        '~/plugins/axios',
        '~/plugins/error-tracker',
        { src: '~/plugins/api-cable', mode: 'client' }
    ],

    server: { port: 8080,  host: '0.0.0.0' },
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

    env: {
        FRONTEND_SOCKET_URL,
        FRONTEND_BUGSNAG_KEY,
        FRONTEND_ENV
    }
};
