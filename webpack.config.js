const webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const path = require('path');
const env = require('yargs').argv.env;

let plugins = [],
  outputFile;

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputFile = 'js-ds-algorithms.min.js';
} else {
  outputFile = 'js-ds-algorithms.js';
}

const config = {
  entry: __dirname + '/src/js/app.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/dist',
    filename: outputFile
  },
  module: {
    rules: [
      {
        test: /(\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('./js')],
    extensions: ['.js']
  },
  plugins: plugins
};

module.exports = config;
