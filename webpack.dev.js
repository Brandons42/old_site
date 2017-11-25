const BabelMinifyPlugin = require('babel-minify-webpack-plugin');
const common = require('./webpack.common.js');
const merge = require('webpack-merge');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

module.exports = merge(common, {
  devServer: {
    compress: true,
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true,
    open: true
  },
  devtool: 'eval-source-map',
  plugins: [
    new BabelMinifyPlugin({}, {
      test: /\.jsx?$/
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
});
