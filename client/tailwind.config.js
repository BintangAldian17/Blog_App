/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'space': ['Poppins'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
}

