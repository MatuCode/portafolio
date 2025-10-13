/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'geist-sans': ['Geist Sans', 'sans-serif'],
          body: ['Geist Sans', 'sans-serif'],
      },
      colors: {
        primary: '#5f2c82',
        secondary: '#49a09d',
      },
    },
  },
  plugins: [],
};
