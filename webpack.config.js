const path = require('path');

module.exports = {
  entry: './src/app/index.js',
  output:{
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/app'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query:{
          presets: ['react', 'env']
        }
      }
    ]
  }
};
