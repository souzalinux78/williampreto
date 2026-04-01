/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd8',
          300: '#e0cec7',
          400: '#d2bab0',
          500: '#a38a80', 
          600: '#8c736a',
          700: '#735b52',
          800: '#5c463d',
          900: '#423028',
        },
        dark: '#1a1a1a',
        light: '#fdfdfd',
        accent: '#cba898',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
