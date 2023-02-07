/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './directives/**/*.js',
        './plugins/**/*.{js,ts}',
        './nuxt.config.{js,ts}',
        './app.vue',
    ],
    theme: {
        extend: {
            animation: {
                shake: 'shake 0.6s cubic-bezier(.25,.8,.5,1)'
            },
            keyframes: {
                shake: {
                    '59%': {'margin-left': '0'},
                    '60%, 80%': {'margin-left': '2px'},
                    '70%, 90%': {'margin-left': '-2px'}
                }
            },
            transitionProperty: {
                spacing: 'margin, padding',
                'font-field': 'transform, color, border-color',
                'button-primary': 'box-shadow, color'
            },
            boxShadow: {
                xl: '0 5px 5px -3px rgb(0 0 0 / 0.2), 0 8px 10px 1px rgb(0 0 0 / 0.14), 0 3px 14px 2px rgb(0 0 0 / 0.12)'
            }
        },
    },
    plugins: [],
}
