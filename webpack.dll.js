const path = require('path');
const webpack = require('webpack');

const UgilfyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
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
