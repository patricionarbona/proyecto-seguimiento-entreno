/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gym1' : '#222831',
        'gym2' : '#31363F',
        'gym3' : '#76ABAE',
        'gym4' : '#EEEEEE'
      }
    },
  },
  plugins: [],
}

