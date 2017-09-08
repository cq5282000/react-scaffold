/**
 * Created by chenqu on 2017/9/4.
 */
const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
// const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
// const HappyPack = require('happypack');
const ROOT = process.cwd();
const rd = require('rd');

const SRC = path.join(ROOT, 'src');

let webpackConfig = {
    entry: {
        // main: './src/entry/main.js',
        // main2: './src/entry/main2.js',
    },
    output: {
        path: path.resolve(ROOT, 'dist'),
        filename: '[name].js',
        publicPath: '/entry/',
    },
    devtool: 'eval',
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(ROOT, 'src'),
                use: 'babel-loader',
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                include: [
                    path.resolve(path.join(ROOT, './'), 'src'),
                ],
                use: 'eslint-loader',
            },
            // {
            //     test: /\.js$/,
            //     include: path.resolve(__dirname, 'src'),
            //     use: ['happypack/loader'],
            // },
        ],
    },
    plugins: [
        // new CleanWebpackPlugin(['dist']), // 清理dist文件
        // new webpack.DefinePlugin({
        //     'process.env': {
        //         NODE_ENV: JSON.stringify('production'),
        //     },
        // }),
        // new webpack.optimize.UglifyJsPlugin(),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'common',
        // }),
        // new HtmlWebpackPlugin({ // 自动绑定bundle文件到模版文件上
        //     title: 'Output Management',
        //     filename: 'html/main.html', // 生成文件位置
        //     template: 'template/index.html', // 模版文件位置
        //     chunks: [
        //         'ma',
        //     ],
        // }),
        // new HtmlWebpackPlugin({ // 自动绑定bundle文件到模版文件上
        //     title: 'Output Management',
        //     filename: 'html/main2.html', // 生成文件位置
        //     template: 'template/index.html', // 模版文件位置
        //     chunks: [
        //         'main2',
        //     ],
        // }),
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
const { entry } = webpackConfig;
let { plugins } = webpackConfig;
rd.eachFileFilterSync(path.join(SRC, '/entry/'), /\.js$/, (file) => {
    const lastPortion = path.basename(file, '.js');
    entry[lastPortion] = `./src/entry/${lastPortion}.js`;
    const htmlWebpackPluginItem = new HtmlWebpackPlugin({
        filename: `html/${lastPortion}.html`, // 生成文件位置
        template: 'template/index.html', // 模版文件位置
        chunks: [lastPortion],
    });
    plugins = [...plugins, htmlWebpackPluginItem];
});
webpackConfig = Object.assign(webpackConfig, { entry, plugins });
module.exports = webpackConfig;
