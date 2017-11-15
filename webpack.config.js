const path = require('path');
const copyPlugin = require('copy-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');


module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
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
          presets: ['env', 'stage-2']
        }
      }
    ]
  },
  plugins: [
    new copyPlugin([
      {from: 'src/data', to: 'data'}
    ]),
    new htmlPlugin({
      template: './src/index.ejs',
      fileName: 'index.html',
      inject: false
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    publicPath: '/',
    compress: true,
    port: 8080,
    historyApiFallback: true,
    inline: true
  }
};
