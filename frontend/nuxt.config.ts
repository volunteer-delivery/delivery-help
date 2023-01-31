const { FRONTEND_API_URL, FRONTEND_SOCKET_URL, FRONTEND_BUGSNAG_KEY, FRONTEND_ENV } = process.env;

export default defineNuxtConfig({
    // target: 'static',

    app: {
        head: {
            title: 'ВолонтерВантаж',

            htmlAttrs: { lang: 'ua' },

            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' }
            ],

            link: [
                { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
            ]
        }
    },

    modules: [
        '@pinia/nuxt',
        '@nuxtjs/device'
        // '@nuxtjs/vuetify',
    ],

    vite: {
        appType: 'spa'
    },

    css: [
        '~/styles/global.css',
        'vue-toast-notification/dist/theme-default.css'
    ],

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
