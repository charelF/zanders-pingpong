/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'zg1': '#78dca0',
                'zg2': '#032323',
            }
        },
    },
    plugins: [],
}

