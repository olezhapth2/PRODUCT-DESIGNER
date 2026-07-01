/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'dela': ['"Dela Gothic One"', 'sans-serif'],
        helvetica: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
