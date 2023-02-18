/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './components/**/*.{vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './directives/**/*.ts',
        './plugins/**/*.ts',
        './nuxt.config.ts',
        './app.vue',
    ],
    theme: {
        extend: {
            animation: {
                'shake': 'shake 0.6s cubic-bezier(.25,.8,.5,1)',
                'spin-progress': 'spin-progress 1s linear infinite',
                'ripple': 'ripple var(--ripple-duration) ease-out forwards'

            },
            keyframes: {
                shake: {
                    '59%': {'margin-left': '0'},
                    '60%, 80%': {'margin-left': '2px'},
                    '70%, 90%': {'margin-left': '-2px'}
                },
                'spin-progress': {
                    '0%': {
                        'stroke-dashoffset': '50',
                        'transform': 'rotate(0)'
                    },
                    '100%': {
                        'stroke-dashoffset': '130',
                        'transform': 'rotate(-360deg)',
                    }
                },
                'ripple': {
                    '0%': {
                        transform: 'scale(0)',
                        opacity: '0'
                    },
                    '10%': {
                        opacity: '1'
                    },
                    '80%': {
                        opacity: '1'
                    },
                    '100%': {
                        transform: 'scale(1.2)',
                        opacity: '0'
                    }
                }
            },
            transitionProperty: {
                'spacing': 'margin, padding',
                'font-field': 'transform, color, border-color',
                'button-primary': 'box-shadow, color',
                'fade': 'transform, opacity',
                'dropdown': 'transform, opacity',
            },
            boxShadow: {
                xl: '0 5px 5px -3px rgb(0 0 0 / 0.2), 0 8px 10px 1px rgb(0 0 0 / 0.14), 0 3px 14px 2px rgb(0 0 0 / 0.12)'
            }
        },
    },
    plugins: [],
}
