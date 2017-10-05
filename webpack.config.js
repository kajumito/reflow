const path = require('path');

module.export = {
  entry: './src/app.js',
  output: {
    filename = 'bundle.js',
    path: path.reolve(__dirname, 'dist')
  },
  watch: true,
  module: {
    loaders: [{
      test:/\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      quary:{
        presets: ['react', 'es2015']
      }
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};
