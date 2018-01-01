import * as common from './webpack.common';
import * as merge from 'webpack-merge';
import * as path from 'path';
import * as webpack from 'webpack';

import * as CleanWebpackPlugin from 'clean-webpack-plugin';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import * as HappyPack from 'happypack';
import * as StatsPlugin from 'stats-webpack-plugin';
import * as Visualizer from 'webpack-visualizer-plugin';

const happyThreadPool: object = HappyPack.ThreadPool({ size: 4 });

export default merge(common, {
  module: {
    rules: [
      {
        exclude: /^node_modules$/,
        test: /\.tsx?$/,
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: {
            loader: 'happypack/loader',
            options: {
              id: 'styles'
            }
          }
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
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CleanWebpackPlugin(['./dist/**/*']),
    new ExtractTextPlugin({
      allChunks: true,
      filename: 'css/[name].[contenthash:8].css'
    }),
    new ForkTsCheckerWebpackPlugin(),
    new HappyPack({
      id: 'scripts',
      loaders: [
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
          loader: 'css-loader',
          options: {
            importLoaders: 2,
            modules: true
          }
        },
        'postcss-loader',
        'sass-loader'
      ],
      threadPool: happyThreadPool
    }),
    new StatsPlugin('../stats.json'),
    new Visualizer({
      filename: '../stats.html'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: 2
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],
  recordsPath: path.resolve(__dirname, 'records.json')
});
