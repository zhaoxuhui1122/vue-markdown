var path = require('path')
var webpack = require('webpack')
const NODE_ENV = process.env.NODE_ENV;
const CompressionWebpackPlugin = require('compression-webpack-plugin')

module.exports = {
  entry: NODE_ENV==='npm'?'./src/index.js':'./src/main.js',
  output: {
    path: path.resolve(__dirname, NODE_ENV==='npm'?'./build':'./dist'),
    publicPath:NODE_ENV==='npm'? '/build/':'/dist/',
    filename: NODE_ENV==='npm'?'index.js':'build.js',
    libraryTarget: 'umd',
    library: 'markdown-vue',
    umdNamedDefine: true
  },
  devtool: NODE_ENV==='develop'?'cheap-module-eval-source-map':'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (NODE_ENV === 'production'||NODE_ENV==='npm') {
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
    }),
    new CompressionWebpackPlugin({
      algorithm: 'gzip'
  })
  ])
}
