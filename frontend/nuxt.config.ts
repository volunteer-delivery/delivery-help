const { FRONTEND_API_URL, FRONTEND_SOCKET_URL, FRONTEND_BUGSNAG_KEY, FRONTEND_ENV } = process.env;

export default defineNuxtConfig({
    ssr: false,

    app: {
        head: {
            title: 'ВолонтерВантаж',

            htmlAttrs: { lang: 'ua' },

            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' }
            ],

            link: [
                { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
                { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
                { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
                { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap' }
            ]
        }
    },

    imports: {
        dirs: [
            'stores',
            'directives',
            'utils'
        ]
    },

    modules: [
        '@vueuse/nuxt',
        '@pinia/nuxt',
        '@nuxtjs/device'
    ],

    css: [
        '~/styles/global.css'
    ],

    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },

    // vuetify: {
    //     theme: {
    //         dark: false,
    //         themes: {
    //             light: { primary: '#3f51b5' }
    //         }
    //     },
    //     icons: { iconfont: 'mdiSvg' },
    //     defaultAssets: { icons: false }
    // },

    device: { refreshOnResize: true },

    runtimeConfig: {
        public: {
            env: FRONTEND_ENV,
            apiUrl: FRONTEND_API_URL,
            socketUrl: FRONTEND_SOCKET_URL,
            bugsnagKey: FRONTEND_BUGSNAG_KEY,
        }
    }
});
