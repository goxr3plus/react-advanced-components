var path = require('path')

const devServerPort = 3001

module.exports = () => {
  const isProduction = process.env.NODE_ENV === 'production'

  return {
    mode: process.env.NODE_ENV,
    devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map', // show original source code so we don't get lost inside bundle.js when errors happen
    entry: './src/index.js', //which file to use as entry
    output: {
      path: path.join(__dirname, 'public', 'dist'),
      filename: 'bundle.js', //final file name
      // libraryTarget: 'commonjs2'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react', '@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread']
            }
          },
          exclude: /node_modules/
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
      contentBase: path.join(__dirname, 'public'), //serves everything from our public/ directory
      watchContentBase: true, //Live Reload on file change
      compress: false, //compress bundle.js
      port: devServerPort, //final application running port [localhost:9000]
      historyApiFallback: true, //We gonna handle routing from client side
      publicPath: '/dist/'
    }
    // externals: {
    //   react: 'react'
    // }
  }
}
