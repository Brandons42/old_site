import * as common from './webpack.common';
//import * as manifest from './vendor-manifest.json';
import * as merge from 'webpack-merge';
import * as path from 'path';
import * as webpack from 'webpack';

import * as HappyPack from 'happypack';

const happyThreadPool: object = HappyPack.ThreadPool({ size: 4 });

export default merge(common, {
  devServer: {
    compress: true,
    open: true,
    hot: true
  },
  //devtool: 'cheap-eval-source-map',
  module: {
    rules: [
      /*{
        enforce: 'pre',
        exclude: /^node_modules$/,
        loader: 'source-map-loader',
        test: /\.js$/
      },*/
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
    path: path.resolve(__dirname, 'dev')
  },
  plugins: [
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
        'style-loader',
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
