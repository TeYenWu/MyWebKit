const HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var webpack = require('webpack');

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
template: `${__dirname}/app/index.html`,
filename: 'index.html',
inject: 'body',
});

// 檔案起始點從 entry 進入，也可以是多個檔案。output 是放入產生出來的結果的相關參數。loaders 則是放欲使用的 loaders，在這邊是使用 babel-loader 將所有 .js（這邊用到正則式）相關檔案轉譯成瀏覽器可以閱讀的 JavaScript。devServer 則是 webpack-dev-server 設定。plugins 放置所使用的外掛
module.exports = {
    devtool: 'eval-source-map',
    entry: [
            'webpack-dev-server/client?http://localhost:3000',
            'webpack/hot/only-dev-server',
            'react-hot-loader/patch',
            path.join(__dirname, 'app/index.js')],
    output: {
        path: path.join(__dirname, '/dist/'),
        filename: '[name].js',
        publicPath: '/'
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint'
            }
        ],
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.json?$/,
                loader: 'json'
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass?modules&localIdentName=[name]---[local]---[hash:base64:5]'
            },
            { test: /\.woff(2)?(\?[a-z0-9#=&.]+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
            { test: /\.(ttf|eot|svg)(\?[a-z0-9#=&.]+)?$/, loader: 'file' }
        ]
    },
    plugins: [
        HTMLWebpackPluginConfig,
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('development')
        })
    ],
    eslint: {
        configFile: '.eslintrc',
        failOnWarning: false,
        failOnError: false
    }
}; 
