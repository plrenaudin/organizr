var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var env = require('./server/.env')

var googleClientId = "'" + env.GOOGLE_CLIENT_ID + "'"
var facebookClientId = "'" + env.FACEBOOK_CLIENT_ID + "'"
var apiHost = "'" + env.SERVER_URL + "'"

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: 'build.js'
  },
  module: {
    rules: [
      { test: /\.vue$/, loader: 'vue-loader', options: { loaders: { sass: ExtractTextPlugin.extract({ use: ['css-loader','sass-loader'], fallback: 'vue-style-loader' }) } } },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.(png|jpg|gif|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader', options: { name: '[name].[ext]?[hash]' } },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
      { test: /\.json$/, loader: 'json-loader', exclude: /node_modules/ }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      __API__: apiHost,
      __GOOGLE_CLIENT_ID__: `${googleClientId}`,
      __FACEBOOK_CLIENT_ID__: `${facebookClientId}`
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new HtmlWebpackPlugin({
      template: 'index.ejs',
      hash: true
    }),
    new ExtractTextPlugin("style.css"),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'async'
    })
  ]
}

if (['production', 'staging'].indexOf(process.env.NODE_ENV) > -1) {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
