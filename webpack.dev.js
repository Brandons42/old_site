const common = require('./webpack.common.js');
const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

const OptimizeJsPlugin = require("optimize-js-plugin");

module.exports = merge(common, {
  devServer: {
    compress: true,
    contentBase: path.join(__dirname, 'dist'),
    hot: true,
    open: true
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        exclude: /^node_modules$/,
        fallback: 'style-loader',
        test: /\.sass$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              minimize: true,
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
      },
      {
        exclude: /^node_modules$/,
        test: /\.(png|svg|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]'
            }
          },
          'image-webpack-loader'
        ]
      },
      {
        exclude: /^node_modules$/,
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]'
          }
        }
      }
    ]
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist')
  },
  plugins: [
    new OptimizeJsPlugin({
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
});
