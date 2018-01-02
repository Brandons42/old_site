module.exports = {
  plugins: [
    require('autoprefixer'),
    require('doiuse'),
    require('postcss-modules')({
      generateScopedName: '-local_[hash:base64]',
      globalModulePaths: [/main\.sass/]
    })
  ]
};
