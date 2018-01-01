const path = require('path');
const webpack = require('webpack');

const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeJsPlugin = require('optimize-js-plugin');
const ResourceHintsWebpackPlugin = require('resource-hints-webpack-plugin');

module.exports = {
  entry: {
    app: [
      path.resolve(__dirname, 'tsx/App.tsx'),
      path.resolve(__dirname, 'ts/styles.ts')
    ]
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        exclude: /^node_modules$/,
        loader: 'tslint-loader',
        test: /\.tsx?$/
      },
      {
        exclude: /^node_modules$/,
        loader: 'pug-loader',
        test: /\.pug$/
      }
    ]
  },
  plugins: [
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
  ],
  resolve: {
    extensions: [
      '.js',
      '.json',
      '.ts',
      '.tsx'
    ]
  }
};
