/**
 * Created by chenqu on 2017/9/4.
 */
const path = require('path');
const glob = require('glob');
const rd = require('rd');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ROOT = process.cwd(); // 运行目录
const SRC = path.join(ROOT, 'src'); // 工作目录
const ENTRY = path.join(SRC, 'entry'); // 入口文件目录
const DIST = path.join(ROOT, 'dist'); // 输出文件目录

const publicPathStr = '/entry/'; // 公共路径字符串
const testStr = /\.js$/; // 校验字符串
const outputFilenameStr = '[name].js';

const BABEL_LOADER = 'babel-loader'; // babel加载器
const BABEL_LOADER_ENFORCE = 'pre'; // babel-loader enforce属性
const ESLINT_LOADER = 'eslint-loader'; // eslint-loader加载器

const DEVTOOL = 'eval'; // devTool设置

let webpackConfig = {}; // webpack设置

webpackConfig = {
    entry: {},
    output: {
        path: DIST,
        filename: outputFilenameStr,
        publicPath: publicPathStr,
    },
    devtool: DEVTOOL,
    module: {
        rules: [
            {
                test: testStr,
                include: SRC,
                use: BABEL_LOADER,
            },
            {
                enforce: BABEL_LOADER_ENFORCE,
                test: testStr,
                include: [
                    SRC,
                ],
                use: ESLINT_LOADER,
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
        //     // chunks: [
        //     //     'main',
        //     // ],
        // }),
        // new HtmlWebpackPlugin({ // 自动绑定bundle文件到模版文件上
        //     title: 'Output Management',
        //     filename: 'html/main2.html', // 生成文件位置
        //     template: 'template/index.html', // 模版文件位置
        //     // chunks: [
        //     //     'main2',
        //     // ],
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
rd.eachFileFilterSync(ENTRY, /\.js$/, (file) => {
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
