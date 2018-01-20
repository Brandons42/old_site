module.exports = {
  //parser: 'postcss-sass',
  plugins: [
    /*require('stylelint')({
      customSyntax: 'postcss-sass'
    }),*/
    //require('postcss-node-sass'),
    require('autoprefixer'),
    require('doiuse')/*,
    require('postcss-modules')({
      generateScopedName: '-local_[hash:base64]',
      globalModulePaths: [/main\.sass/]
    })*/
  ]
};
