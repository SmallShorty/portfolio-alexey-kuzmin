/** @type {import('tailwindcss').Config} */


export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Montserrat', 'sans-serif'],
            },
            colors: {
                'text': {
                    100: '#EEEBDD',
                    25: '#504C49'
                },
                'background': {
                    DEFAULT: '#181818',
                    100: '#181818',
                    110: '#1B1B1B',
                    125: '#272727',
                    150: '#373737'
                },
                'primary': '#CE1212',
                'secondary': '#810000',
                'accent': '#ff0000',
            },
            keyframes: {
                animatedgradient: {
                    '0%': {backgroundPosition: '0% 50%'},
                    '50%': {backgroundPosition: '100% 50%'},
                    '100%': {backgroundPosition: '0% 50%'},
                },
            },
            backgroundSize: {
                '300%': '300%',
            },
            animation: {
                gradient: 'animatedgradient 6s ease infinite alternate',
            },
        },
    },
    plugins: [
    ],
}