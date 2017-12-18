const path = require('path');
const webpack = require('webpack');
module.exports = {
  entry: {
    build: "./src/main.js"
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "js/[name].js"
  },
  devServer: {
    host: 'localhost',
    port: 9988,
    inline: true,
    historyApiFallback: true,
    hot: true,
    noInfo: true,
    open: true
  },
  devtool: '#eval-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname, 'src')
        ],
        options: {
          "presets": ["latest"]
        },
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.html$/,
        loader: 'vue-html-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.jpg|\.png|\.gif|\.svg$/,
        loader: 'file-loader',
        query: {
            name: 'img/[name]-[hash:5].[ext]'
        }
      },
      {
        test: /\.(svg|ttf|eot|woff|woff2)$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      }
    ]
  },
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.esm.js'
    }
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin()
  ]
}
