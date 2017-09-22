/**
 * Created by chenqu on 2017/9/5.
 */

import open from 'open';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import path from 'path';
import webpackConfig from '../../webpack.config';

const compiler = webpack(webpackConfig);

const SRC = path.join(process.cwd(), 'src');
// const MOCK_SERVER = path.join(process.cwd(), 'mock-server');

const devServerOptions = {
    hot: true, // 告诉 dev-server 我们在使用 HMR
    contentBase: path.resolve(__dirname, 'src'),
    inline: true,
    historyApiFallback: true,
    stats: 'normal',
    publicPath: '/entry/',
    host: '0.0.0.0',
    port: 8080,
};

const server = new WebpackDevServer(compiler, devServerOptions);
let opened = false;

const openBrowser = () => {
    const address = server.listeningApp.address();
    const url = `http://${address.address}:${address.port}`;
    open(`${url}/entry/html/index-for-demo.html`);
};

compiler.plugin('done', () => {
    if (!opened) {
        opened = true;
        openBrowser();
    }
});

const startServer = new Promise((resolve, reject) => {
    server.listen(webpackConfig.devServer.port, webpackConfig.devServer.host, (err) => {
        if (err) {
            reject(err);
        } else {
            resolve();
        }
    });
});

const devServer = async() => {
    await startServer;

    const stdIn = process.stdin;
    stdIn.setEncoding('utf8');
    stdIn.on('data', openBrowser);
};

devServer().catch((ex) => {
    console.error(ex);
});

