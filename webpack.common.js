const path = require('path');
const webpack = require('webpack');

const BabelMinifyPlugin = require('babel-minify-webpack-plugin');
//const CommonShakePlugin = require('webpack-common-shake').Plugin;
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeJsPlugin = require('optimize-js-plugin');
const ResourceHintsWebpackPlugin = require('resource-hints-webpack-plugin');

module.exports = {
  entry: {
    app: [
      path.resolve(__dirname, 'jsx/app.jsx'),
      path.resolve(__dirname, 'js/styles.js')
    ]
  },
  module: {
    rules: [
      /*{
        enforce: 'pre',
        exclude: /^node_modules$/,
        loader: 'eslint-loader',
        options: {
          eslintPath: path.resolve(__dirname, '.eslintrc.json')
        },
        test: /\.jsx?$/
      },*/
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
    //new CommonShakePlugin(),
    new DuplicatePackageCheckerPlugin(),
    new HardSourceWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.pug'
    }),
    new OptimizeJsPlugin(),
    new ResourceHintsWebpackPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname
      }
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ]
};
