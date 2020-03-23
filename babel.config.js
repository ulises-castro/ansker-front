module.exports = {
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ],
  presets: [
    '@quasar/babel-preset-app'
  ]
}
