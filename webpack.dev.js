const common = require('./webpack.common.js');
const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

const HappyPack = require('happypack');

const happyThreadPool = HappyPack.ThreadPool({ size: 4 });

module.exports = merge(common, {
  devServer: {
    compress: true,
    open: true,
    hot: true
  },
  //devtool: 'cheap-eval-source-map',
  module: {
    rules: [
      {
        exclude: /^node_modules$/,
        test: /\.jsx?$/,
        use: {
          loader: 'happypack/loader',
          options: {
            id: 'scripts'
          }
        }
      },
      {
        exclude: /^node_modules$/,
        test: /\.sass$/,
        use: [
          {
            loader: 'happypack/loader',
            options: {
              id: 'styles'
            }
          }
        ]
      },
      {
        exclude: /^node_modules$/,
        test: /\.(png|svg|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
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
            name: '[name].[ext]'
          }
        }
      }
    ]
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dev')
  },
  plugins: [
    new HappyPack({
      id: 'scripts',
      loaders: ['babel-loader'],
      threadPool: happyThreadPool
    }),
    new HappyPack({
      id: 'styles',
      loaders: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2,
            minimize: true
          }
        },
        'postcss-loader',
        'sass-loader'
      ],
      threadPool: happyThreadPool
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
});
