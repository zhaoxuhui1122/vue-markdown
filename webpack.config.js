var path = require('path')
var webpack = require('webpack')
const NODE_ENV = process.env.NODE_ENV;
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development';
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

let analyzerPlugin = [];
if(process.env.analyzer==='true'){
    analyzerPlugin.push(new BundleAnalyzerPlugin())
}
module.exports = {
    entry: NODE_ENV === 'npm' ? './src/index.js' : './src/main.js',
    output: {
        path: path.resolve(__dirname, NODE_ENV === 'npm' ? './build' : './dist'),
        publicPath: NODE_ENV === 'npm' ? '/build/' : '/dist/',
        filename: NODE_ENV === 'npm' ? 'index.js' : 'build.js',
        libraryTarget: 'umd',
        library: 'markdown-vue',
        umdNamedDefine: true
    },
    devtool: isDev ? 'cheap-module-eval-source-map' : 'cheap-module-source-map',
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        overlay: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ],
            }, {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {}
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
    plugins: [
        ...analyzerPlugin,
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ]
}

