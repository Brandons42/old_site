import * as path from 'path';
import * as webpack from 'webpack';

import * as DuplicatePackageCheckerPlugin from 'duplicate-package-checker-webpack-plugin';
import * as FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import * as HardSourceWebpackPlugin from 'hard-source-webpack-plugin';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as OptimizeJsPlugin from 'optimize-js-plugin';
import * as ResourceHintsWebpackPlugin from 'resource-hints-webpack-plugin';

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
    new HardSourceWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.pug'
    }),
    new OptimizeJsPlugin(),
    new ResourceHintsWebpackPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname
      }
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
  resolve: {
    extensions: [
      '.js',
      '.json',
      '.ts',
      '.tsx'
    ]
  }
};
