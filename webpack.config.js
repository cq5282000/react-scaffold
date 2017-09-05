/**
 * Created by chenqu on 2017/9/4.
 */
const webpack = require('webpack');
const path = require('path');
// const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
// const HappyPack = require('happypack');

const SRC = path.join(__dirname, 'src');

const webpackConfig = {
    entry: {
        app: [
            './src/main.js',
        ],
    },
    output: {
        path: path.resolve(__dirname, 'dist/entry'),
        filename: '[name].js',
        publicPath: './',
    },
    devtool: 'eval',
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                use: 'babel-loader',
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                include: [
                    path.resolve(path.join(__dirname, './'), 'src'),
                ],
                use: 'eslint-loader',
            },
        ],
    },
    plugins: [
        // new CleanWebpackPlugin(['dist']), // 清理dist文件
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
        new webpack.optimize.UglifyJsPlugin(),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'common',
        // }),
        new HtmlWebpackPlugin({ // 自动绑定bundle文件到模版文件上
            title: 'Output Management',
            filename: 'index.html', // 生成文件位置
            template: 'src/index.html', // 模版文件位置
        }),
        // new OpenBrowserPlugin({ // 启动时打开浏览器,npm start配置会打开浏览器，连个同时配置，就会打开多个浏览器
        //     url: 'http://localhost:8080/',
        // }),
        // new HappyPack({
        //     // loaders is the only required parameter:
        //     loaders: ['babel-loader'],
        //     // customize as needed, see Configuration below
        //     // threadPool: happyThreadPool
        //     // loaders: ['babel?presets[]=es2015'],
        // }),
    ],
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        stats: {
            colors: true,
            hash: false,
            version: false,
            timings: false,
            assets: false,
            chunks: false,
            modules: false,
            reasons: false,
            children: false,
            source: false,
            errors: true,
            errorDetails: true,
            warnings: true,
            publicPath: false,
        },
        host: '127.0.0.1',
        port: 8080,
    },
};

module.exports = webpackConfig;
