/// <reference path="./typings.d.ts"/>
//import babelrc from './.babelrc';
//import browserslistrc from './.browserslistrc';
import { common, happyThreadPool } from './webpack.common';
//import * as manifest from './vendor-manifest.json';
import * as merge from 'webpack-merge';
import * as objectHash from 'node-object-hash';
import * as path from 'path';
import * as postcssConfig from './postcss.config';
import * as posthtmlConfig from './posthtml.config';
import * as stylelintConfig from './.stylelintrc.json';
import * as tsconfig from './tsconfig.json';
import * as tslint from './tslint.json';
import * as webpack from 'webpack';

import * as HappyPack from 'happypack';
import * as HardSourceWebpackPlugin from 'hard-source-webpack-plugin';

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
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: path.resolve(__dirname, '.cache/cache-loader/prod')
            }
          },
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
    new HardSourceWebpackPlugin({
      cacheDirectory: path.resolve(__dirname, '.cache/hard-source/dev/[confighash]'),
      configHash: function(webpackConfig: object) {
        return objectHash({sort: false}).hash({
          //babelrc: babelrc,
          //browserslistrc: browserslistrc,
          postcssConfig: postcssConfig,
          posthtmlConfig: posthtmlConfig,
          stylelintConfig: stylelintConfig,
          tsconfig: tsconfig,
          tslint: tslint,
          webpackConfig: webpackConfig
        });
      },
      environmentHash: {
        directories: [],
        files: ['yarn.lock'],
        root: process.cwd()
      }
    }),
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
