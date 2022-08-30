/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js,vue}'],
    theme: {
        extend: {
            fontFamily: {
                Montserrat: ['Montserrat', 'sans-serif'],
                Mulish: ['Mulish', 'sans-serif'],
            },
            screens: {
                mb: { max: '425px' },
            },
        },
    },
    plugins: [],
};
