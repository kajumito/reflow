const path = require('path');
const compressionPlugin = require('compression-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  cache: false,
  output:{
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query:{
          presets: ['env']
        }
      }
    ]
  },
  plugins: [
    new compressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$\.html$/,
      treshold: 10240,
      minRatio: 0.8
    })
  ]
};
