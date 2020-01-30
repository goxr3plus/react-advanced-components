var path = require('path')

const devServerPort = 3001

module.exports = {
  mode: 'production',
  entry: './src/index.js', //which file to use as entry
  output: {
    path: path.join(__dirname, 'build', 'dist'),
    filename: 'bundle.js', //final file name
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader' //loader allows as to give only one entry
      },
      {
        test: /\.(scss|css)$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } }
        ]
      }
    ]
  },
  // use dev server
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    watchContentBase: true, //Live Reload on file change
    compress: false, //compress bundle.js
    port: devServerPort, //final application running port [localhost:9000]
    historyApiFallback: true, //We gonna handle routing from client side
    publicPath: '/dist/'
  },
  externals: {
    react: 'react'
  }
}
