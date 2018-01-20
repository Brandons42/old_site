//import babelrc from './.babelrc';
import { common, happyThreadPool } from './webpack.common';
//import * as manifest from './vendor-manifest.json';
import * as merge from 'webpack-merge';
//import * as objectHash from 'node-object-hash';
import * as path from 'path';
//import * as postcssConfig from './postcss.config.js';
//import * as tsConfig from './tsconfig.json';
import * as webpack from 'webpack';

import * as HappyPack from 'happypack';
//import * as HardSourceWebpackPlugin from 'hard-source-webpack-plugin';

export default merge(common, {
  devServer: {
    compress: true,
    open: true,
    hot: true
  },
  devtool: 'cheap-eval-source-map',
  module: {
    rules: [
      {
        enforce: 'pre',
        exclude: /^node_modules$/,
        loader: 'source-map-loader',
        test: /\.js$/
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
        test: /\.(png|jpe?g|gif)$/,
        use: [
          //'cache-loader',
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              gifsicle: {
                optimizationLevel: 1
              },
              optipng: {
                optimizationLevel: 0
              },
              pngquant: {
                speed: 10
              }
            }
          }
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
    path: path.resolve(__dirname, 'dev'),
    publicPath: '/'
  },
  plugins: [
    new HappyPack({
      id: 'scripts',
      loaders: [
        //'cache-loader',
        'babel-loader',
        {
          loader: 'ts-loader',
          options: {
            happyPackMode: true
          }
        }
      ],
      threadPool: happyThreadPool
    }),
    new HappyPack({
      id: 'styles',
      loaders: [
        {
          loader: 'style-loader',
          options: {
            //sourceMap: true
          }
        },
        {
          loader: 'css-loader',
          options: {
            alias: {
              //img: path.resolve(__dirname, '../../img/')
            },
            importLoaders: 2,//1
            //sourceMap: true
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            //sourceMap: true
          }
        },
        {
          loader: 'sass-loader',
          options: {
            includePaths: [
              //path.resolve(__dirname, '../../img/')
            ],
            //sourceMap: true
          }
        }
      ],
      threadPool: happyThreadPool
    }),
    /*new HardSourceWebpackPlugin({
      cacheDirectory: 'node_modules/.cache/hard-source/dev/[confighash]',
      configHash: function(webpackConfig: object) {
        const hashed: object = {
          postcssConfig: postcssConfig,
          webpackConfig: webpackConfig
        };
        return objectHash({sort: false}).hash(webpackConfig);
      }
    }),*/
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    /*new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: manifest
    }),*/
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
});
