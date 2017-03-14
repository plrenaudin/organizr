var path = require('path')
var webpack = require('webpack')

var apiHost;
var setupAPI = function() {
  switch(process.env.NODE_ENV) {
    case 'production':
      apiHost = "'https://organizr.io/api'";
      break;
    case 'staging':
      apiHost = "'https://dev.plrenaudin.com/api'";
      break;
    default:
      apiHost = "'http://localhost:3003/'"
      break;
  }
}
setupAPI()
module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      { test: /\.vue$/, loader: 'vue-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.(png|jpg|gif|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader', options: { name: '[name].[ext]?[hash]' } },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
      { test: /\.json$/, loader: 'json-loader', exclude: /node_modules/ }
    ]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      __API__: apiHost
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
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
