const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const env = require('./server/.env');
const ManifestPlugin = require('webpack-manifest-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');


const googleClientId = `"${env.GOOGLE_CLIENT_ID}"`;
const facebookClientId = `"${env.FACEBOOK_CLIENT_ID}"`;
const apiHost = `"${env.SERVER_URL}"`;

module.exports = {
  entry: './src/main.js',
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: 'build.js'
  },
  module: {
    rules: [
      { test: /\.vue$/, loader: 'vue-loader' },

      { test: /\.scss$/, loader: 'vue-style-loader!css-loader!sass-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.(png|jpg|gif|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        options: { name: '[name].[ext]?[hash]' }
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff'
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vue: {
          name: 'vue',
          test: /\/node_modules\/vue.*/
        },
        vendors: { test: /\/node_modules\/[^vue].*/, name: 'vendors' }
      }
    }
  },
  devtool: '#eval-source-map',
  plugins: [
    new VueLoaderPlugin(),
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
    new ManifestPlugin({
      fileName: 'asset-manifest.json'
    }),
    new CopyWebpackPlugin([
      { from: 'src/assets/manifest.json' },
      { from: 'src/assets/logo.png' }
    ]),
    new SWPrecacheWebpackPlugin({
      // By default, a cache-busting query parameter is appended to requests
      // used to populate the caches, to ensure the responses are fresh.
      // If a URL is already hashed by Webpack, then there is no concern
      // about it being stale, and the cache-busting can be skipped.
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: 'service-worker.js',
      logger(message) {
        if (message.indexOf('Total precache size is') === 0) {
          // This message occurs for every build and is a bit too noisy.
          return;
        }
        console.log(message);
      },
      minify: true, // minify and uglify the script
      navigateFallback: '/',
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/]
    })
  ]
};

if (['production', 'staging'].indexOf(process.env.NODE_ENV) > -1) {
  module.exports.devtool = '#source-map';
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    })
  ]);
}
