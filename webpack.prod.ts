/// <reference path="./typings.d.ts"/>
//import babelrc from './.babelrc';
//import browserslistrc from './.browserslistrc';
import { common, happyThreadPool } from './webpack.common';
import * as glob from 'glob-all';
import * as merge from 'webpack-merge';
import * as objectHash from 'node-object-hash';
import * as path from 'path';
import * as postcssConfig from './postcss.config';
import * as posthtmlConfig from './posthtml.config';
import * as stylelintConfig from './.stylelintrc.json';
import * as tsconfig from './tsconfig.json';
import * as tslint from './tslint.json';
import * as webpack from 'webpack';

import * as CleanWebpackPlugin from 'clean-webpack-plugin';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import * as HappyPack from 'happypack';
import * as HardSourceWebpackPlugin from 'hard-source-webpack-plugin';
import * as PurifyCSSPlugin from 'purifycss-webpack';
import * as StatsPlugin from 'stats-webpack-plugin';
import * as StyleExtHtmlWebpackPlugin from 'style-ext-html-webpack-plugin';
import * as WebpackMonitor from 'webpack-monitor';

const external = new ExtractTextPlugin('css/[name].[contenthash:8].css');
const internal = new ExtractTextPlugin('css/inline.css');

const styles: object = {
  loaders: [
    //'cache-loader',
    {
      loader: 'css-loader',
      options: {
        importLoaders: 2
      }
    },
    'postcss-loader',
    'sass-loader'
  ],
  threadPool: happyThreadPool
};

const config: object = {
  module: {
    rules: [
      {
        exclude: /^node_modules$/,
        test: /\.critical\.sass$/,
        use: internal.extract({
          fallback: 'style-loader',
          use: {
            loader: 'happypack/loader',
            options: {
              id: 'internal'
            }
          }
        })
      },
      {
        exclude: /(node_modules|\.critical\.sass)$/,
        test: /\.sass$/,
        use: external.extract({
          fallback: 'style-loader',
          use: {
            loader: 'happypack/loader',
            options: {
              id: 'external'
            }
          }
        })
      },
      {
        exclude: /^node_modules$/,
        test: /\.(png|jpe?g|gif)$/,
        use: [
          //'cache-loader',
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[hash:8].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              gifsicle: {
                optimizationLevel: 3
              },
              optipng: {
                optimizationLevel: 7
              },
              pngquant: {
                speed: 1
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
            name: '[path][name].[hash:8].[ext]'
          }
        }
      }
    ]
  },
  output: {
    filename: 'js/[name].[chunkhash:8].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    external,
    internal,
    new CleanWebpackPlugin(['./dist/**/*']),
    new ForkTsCheckerWebpackPlugin(),
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
    new HappyPack(merge(styles, {
      id: 'external'
    })),
    new HappyPack(merge(styles, {
      id: 'internal'
    })),
    new HardSourceWebpackPlugin({
      cacheDirectory: path.resolve(__dirname, '.cache/hard-source/prod/[confighash]'),
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
    /*new PurifyCSSPlugin({
      moduleExtensions: [
        '.pug',
        '.ts',
        '.tsx',
      ],
      paths: glob.sync([
        path.resolve(__dirname, 'index.pug'),
        path.resolve(__dirname, 'tsx', '**', '*.ts'),
        path.resolve(__dirname, 'tsx', '**', '*.tsx')
      ]),
      purifyOptions: {
        whitelist: ['*-local_*']
      },
      styleExtensions: ['.sass']
    }),*/
    new StatsPlugin('../stats.json'),
    new StyleExtHtmlWebpackPlugin('css/inline.css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: 2
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],
  recordsPath: path.resolve(__dirname, 'records.json')
};

export { config as production };

export default merge(common, config, {
  plugins: [
    new WebpackMonitor({
      target: './stats.json'
    })
  ]
});
