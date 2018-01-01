import * as path from 'path';
import * as webpack from 'webpack';

import * as UgilfyJsPlugin from 'uglifyjs-webpack-plugin';

export default {
  entry: {
    vendor: [
      'react',
      'react-dom'
    ]
  },
  output: {
    filename: '[name].js',
    library: '[name]',
    //path: path.resolve(__dirname, 'dll')
    path: __dirname
  },
  plugins: [
    new UgilfyJsPlugin({
      parallel: true,
      test: /\.js$/
    }),
    new webpack.DllPlugin({
      context: __dirname,
      name: '[name]',
      //path: path.resolve(__dirname, 'dll', '[name]-manifest.json')
      path: path.resolve(__dirname, '[name]-manifest.json')
    })
  ]
};
