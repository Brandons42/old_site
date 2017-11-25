const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');


module.exports = {
  entry: {
    index: path.resolve(__dirname, 'scripts/index.js')
  },
  module: {
    rules: [
      {
        test: /\.sass$/,
        exclude: /^node_modules$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /^node_modules$/,
        loader: 'eslint-loader',
        options: {
          eslintPath: path.resolve(__dirname, '.eslintrc.json')
        }
      },
      {
        test: /\.jsx?$/,
        exclude: /^node_modules$/,
        loader: 'babel-loader'
      },
      {
        test: /\.pug$/,
        exclude: /^node_modules$/,
        loader: 'pug-loader'
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        exclude: /^node_modules$/,
        use: ['file-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        exclude: /^node_modules$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['./dist']),
    new ExtractTextPlugin('[name].css'),
    new HtmlWebpackPlugin({
      template: 'index.pug'
    }),
    new webpack.optimize.ModuleConcatenationPlugin()
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
};
