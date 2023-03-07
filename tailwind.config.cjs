/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
    './index.html'
  ],
  theme: {
    extend: {

      gridTemplateColumns: {
        3: "repeat(3, minmax(0,90px))",
      },


    },
  },
  plugins: [],
}
