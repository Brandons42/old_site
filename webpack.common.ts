import * as cssnano from 'cssnano';
import * as path from 'path';
import * as webpack from 'webpack';

import * as DuplicatePackageCheckerPlugin from 'duplicate-package-checker-webpack-plugin';
import * as FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import * as HardSourceWebpackPlugin from 'hard-source-webpack-plugin';
import * as HtmlWebpackInlineSVGPlugin from 'html-webpack-inline-svg-plugin';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import * as OptimizeJsPlugin from 'optimize-js-plugin';
import * as ResourceHintsWebpackPlugin from 'resource-hints-webpack-plugin';
import * as UgilfyJsPlugin from 'uglifyjs-webpack-plugin';

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
    new FaviconsWebpackPlugin('./img/temporary-favicon.png'),
    //new HardSourceWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.pug'
    }),
    new HtmlWebpackInlineSVGPlugin(),
    new OptimizeCssAssetsPlugin({
      cssProcessor: cssnano,
      canPrint: false
    }),
    new OptimizeJsPlugin(),
    new ResourceHintsWebpackPlugin(),
    new UgilfyJsPlugin({
      parallel: true
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname
      }
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
  resolve: {
    alias: {
      'img': path.resolve(__dirname, 'img/'),
      'sass': path.resolve(__dirname, 'sass/modules/')
    },
    extensions: [
      '.js',
      '.json',
      '.sass',
      '.ts',
      '.tsx'
    ]
  }
};
