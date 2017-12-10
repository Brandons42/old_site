const common = require('./webpack.common.js');
const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = merge(common, {
  module: {
    rules: [
      {
        exclude: /^node_modules$/,
        test: /\.sass$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                minimize: true
              }
            },
            'postcss-loader',
            'sass-loader'
          ]
        })
      },
      {
        exclude: /^node_modules$/,
        test: /\.(png|svg|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[hash:8].[ext]'
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
            name: '[path][name].[hash:8].[ext]'
          }
        }
      }
    ]
  },
  output: {
    filename: 'js/[name].[chunkhash:8].js',
    path: path.join(__dirname, 'dist')
  },
  plugins: [
    new CleanWebpackPlugin(['./dist/**/*']),
    new ExtractTextPlugin({
      allChunks: true,
      filename: 'css/[name].[contenthash:8].css'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: ({ resource }) => /node_modules/.test(resource)
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],
  recordsPath: path.join(__dirname, 'records.json')
});
