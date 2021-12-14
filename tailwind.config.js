module.exports = {
  mode: 'jit',
  purge: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx,scss}'
  ],
  whitelist: [],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      display: []
    },
  },
  plugins: [],
}
