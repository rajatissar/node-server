import path from 'path';
import nodeExternals from 'webpack-node-externals';
// const path = require('path');
// const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './index.js',
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/',
    filename: 'webpack-server.js'
  },
  externals: [nodeExternals()],
  mode: 'development',
  target: 'node',
  node: {
    __filename: true,
    __dirname: true
  },
  context: __dirname
};
