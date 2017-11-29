const path = require('path');
const webpack = require('webpack');

const BabelMinifyPlugin = require('babel-minify-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CommonShakePlugin = require('webpack-common-shake').Plugin;
const CompressionPlugin = require("compression-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    components: path.join(__dirname, 'components/app.jsx')
  },
  module: {
    rules: [
      /*{
        enforce: 'pre',
        exclude: /^node_modules$/,
        loader: 'eslint-loader',
        options: {
          eslintPath: path.join(__dirname, '.eslintrc.json')
        },
        test: /\.jsx?$/
      },*/
      {
        exclude: /^node_modules$/,
        loader: 'babel-loader',
        test: /\.jsx?$/
      },
      {
        exclude: /^node_modules$/,
        loader: 'pug-loader',
        test: /\.pug$/
      }
    ]
  },
  plugins: [
    new BabelMinifyPlugin({}, {
      test: /\.jsx?$/
    }),
    new CleanWebpackPlugin(['./dist']),
    new CommonShakePlugin(),
    //new CompressionPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.pug'
    }),
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
};
