const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, './src/'),
  entry: {
    'app.js': './js/index.js',
    'app.css': [
      './css/markdown.css',
      './css/vue.css'
    ]
  },
  output: {
    path: path.resolve(__dirname, './public/assets'),
    filename: '[name]'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            js: 'babel-loader'
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: { url: false }
            }
          ],
        }),
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['.js', '.vue', '.css']
  },
  plugins: [
    new CleanWebpackPlugin(['public/assets']),
    new CopyWebpackPlugin([
      {
        from: './images/*'
      }
    ]),
    new ExtractTextPlugin('[name]')
  ]
};

if (process.env.NODE_ENV === 'production') {
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
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: { discardComments: { removeAll: true } }
    })
  ]);
}
