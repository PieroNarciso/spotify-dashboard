module.exports = {
  purge: {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
    options: {}
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('daisyui')],
}
