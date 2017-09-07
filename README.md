# react-scaffold

## 脚手架更新日志 2017-09-06

第一次做一个脚手架，到今天为止，有个雏形了，更新记录一下，最终整个脚手架是为了做成webpack+react+es6+redux的形式，后期根据需要可能会考虑
引入react-router，按需加载的形式，我接下来详细说一下真个项目的搭建过程，算是这段时间的总结，从5秒优化到200-300ms，目前编译时间测是测是
250多秒左右，是我现在暂时优化的极限，接下来打算记录一下整个项目的搭建过程，避免遗忘

## 项目结构  babel-转码器

NPM项目的搭建就不说了，可以参考我的其他的github链接，这里整个项目的架包管理使用的是yarn，安装指令

```bash
$ yarn install
```

首先必须，babel转码器，需要做以下配置

- .babelrc是转码器配置文件,需要新建
- babel-preset-stage-0 是es6的转码规则，官方还提供了1，2，3，建议使用0，因为比如你是用2，某些修饰符，例::绑定修饰符，在项目中无法使用,
安装指令：

```bash
$ yarn add babel-preset-stage-0 --save-dev
```

- babel-preset-react 是react的转码规则，安装指令

```bash
$ yarn add babel-preset-react --save-dev
```

- babel-preset-es2015 es2015语法的转码规则，安装指令

```bash
$ yarn add babel-preset-es2015 --save-dev
```

- babel-register 改写require命令，为他加上一个钩子，每当使用require加载 .js, .jsx , .es ,.es6后缀名的文件，就会先用babel进行转码

```bash
$ yarn add babel-register --save-dev
```

使用是必须先加载babel-register,

```bash
$ require('babel-register')();
```

大家注意这里的使用方式require后加了一个（），用公司大佬的话说就是函数是一等公民，其实不加也可以用啦，我也不知道为什么要这样，就当作约定俗
成吧，哈哈哈哈

- babel-polyfill babel默认只转换心得javascript语法，而不转换新的API，例如Promise，以及一些定义在全局对象上的语法，安装指令

```bash
$ yarn add babel-polyfill --save-de
```

## 脚手架更新日志 2017-09-07

## eslint -- 校验规则

eslint是编程规范的一个准则，在工程里引入eslint的话，需要在编译器里打开eslint检验，然后在工程的根目录下新建.eslintrc文件，这里使用的
eslint的版本是eslint-config-airbnb，安装指令如下：

```bash
$ yarn add eslint-config-airbnb --save-dev
```

若不能满足规则的话，可以在eslint的rules规则中自行添加规范

## gitignore

.gitignore文件可以设置上传到github的文件类型，一些本地编译或者安装生成的文件，没有必要上传到github，可以在此处做限制
 
## package.json 

是架包管理的文件，通过yarn命令或者npm命令安装的一些文件都可以在此找到，scripts可以设置编译和运行命令，此文件无需手动创建，通过npm init
指令生成，此处不做赘述，其他github有详细介绍

## webpack配置

webpack.config.js是webpack的配置文件，关于webpack的详细说明大家可以参考文档，这里指详细说明一下我用到的配置，以及配置的整个修改过程，
我的整个工程一开始所有的配置如下

- 入口处就是最常规的配置，因为一开始还没有引入多文件，只使用单文件做测试，所以入口处的配置就是最简单的

```bash
$..........
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
.....
```

- loader的引入当然直接就babel-loader,但是怕编译速度过慢，于是引入happypack来进行并行编译，几多文件同时编译来提高编译速度，可是这样并没


```bash
$..........
       new HappyPack({
           // loaders is the only required parameter:
           loaders: ['babel-loader'],
           // customize as needed, see Configuration below
           // threadPool: happyThreadPool
           // loaders: ['babel?presets[]=es2015'],
       }),
       {
            test: /\.js$/,
            include: path.resolve(__dirname, 'src'),
            use: ['happypack/loader'],
       },
.....
```

- 其次，还引入的CommonsChunkPlugin，这个的作用就是把你工程编译问价 的公共模块拆分出来，最终合成的文件只在最开始的时候加载一次，然后缓存
起来共后续使用，这个因为一开始我是但文件入口配置，做一效果并不是很明显，

- CleanWebackPlugin引入用来清理dist文件，其实这个没有太大必要，

- HtmlWebpackPlugin用来设置编译生成的文件位置以及编译所用的模版文件，

- OpenBrowserPlugin 这个是用来打开浏览器的插件，webpack-dev-server启动以后，使用它来打开浏览器，但是这种做法并不好

- UglifyJsPlugin JS代码丑化插件，

- source map 用来追踪错误代码的位置，

好啦就这样一去不复返的踏上了一条不归路，平均打包时间4000多ms，每次修改的编译时间2000多ms，这简直了有木有，照这样开发人员老死都完不成一个
工程的编译，具体的求助修改的心路历程就不说了，总之一句话，把身段放到最低，取出虚荣心，把自己当成一直最菜的菜鸟，这样就可以了，第二步，任何
可以查阅的资料和人都可以是你的老师，不管对方是大神，还是一个应届毕业生，大多数人到一个阶段就停滞不前的原因，大多数都是放不下自己的身段，总之，
不停吧以前清零，保持一个良好的学习心态，才有可能成为大神，虚荣心误人，虚荣心误人，虚荣心误人，心里默念三遍


## 优化过程

- plugin或者loader覆盖的范围最小，使用include设置作用范围，只把需要用到转码编译的文件进行加载引入，

- 去除不必要的插件，插件越小，编译速度越快，CleanWebackPlugin，不是特别必要，可以去掉，UglifyJsPlugin代码丑化插件，只在生产环境中引入，
开发环境中可以去掉，通过new webpack.DefinePlugin可设置环境，

- compiling and saving asserts in memory rather than writing to disk, 不知道如何精准的翻译这句话，所以就引用原话，像我起初一开始
设置的这种方式，直接使用webpack编译，然后通过webpack-dev-server启动，这种方式就属于直接writing to disk,这种方式并不好其实，我们这样做，
代码如下

```bash
const compiler = webpack(webpackConfig);
```

我们直接通过webpack的方法编译之后存储在一个变量里compiler里，然后每次启动devServer都是去这个变量里去取编译配置资源，这样就可以提高速度

- 不同的devtool的配置会极大的影响编译速度，这一点配置的时候尤其注意，非常重要，配置成eval的时候具有最好的性能，但是官方文档推荐的是
eval-cheap-module-source-map，打击根据个人偏好了。

- 一些插件只在生产环境中有意义，开发环境中并没有意义，可以直接在开发环境中去掉，例如上面提到的UglifyJsPlugin，ExtractTextPlugin

- sourceMap会增加许多额外的开销，尤其好费时间，尽量避免在工程中引入source-map

- eslint-loader 如果工程中引入了eslint规则，

## 待优化的 

- Minimal Entry Chunk

- Incremental Builds

- Production

- Multiple Compilations

- Specific Tooling Issues

- Worker Pool

- DllPlugin

以上待优化的项目目前对我的变加不加对我的项目没有太大影响，所以想不做优化，后期项目慢了会考虑下引入去做优化，