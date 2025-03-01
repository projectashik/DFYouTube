/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff0000',
        'primary-hover': '#cc0000',
      },
    },
  },
  plugins: [],
}