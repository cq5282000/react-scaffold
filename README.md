## any question

微信 - yingyangkuaixian11

## 目录结构

```                 
├── mock-server                   # 本地模拟数据接口
|  └── api                        # 本地测试接口
├── node_modules                  # 架包管理目录  
├── scripts                       # 脚本目录
|  ├── dev                        # 启动本地服务器配置
|  └── dev.js                     # 转码配置
├── src                           # 工程源码目录
|  ├── actions                    # redux的action目录，开发时建议每个界面的action单独新建文件夹，首字母大写，文件夹下新建js文件
|  ├── api                        # 接口定义
|  ├── components                 # 抽象组件存放目录
|  ├── configs                    # 工程配置目录
|  ├── containers                 # 业务组件存放目录，开发式建议每个页面新建文件夹，首字母大写，文件夹下新建JS文件，首字母大写
|  ├── entry                      # 入口文件，一律小写，不能大写
|  ├── libs                       # 常用API 的存放目录
|  └── reducers                   # redux的reducer目录。开发时建议每个页面新建文件夹，首字母大写，文件夹下新建JS文件
├── template                      # 模版文件目录
|  └── index.html                 # 全局界面的模版文件
├── .babelrc                      # 转码器配置
├── .eslintrc                     # eslint检验规则，此工程使用的是eslint-config-airbnb
├── .gitignore                    # GitHub远程推送规则设置
├── package.json                  # node配置文件
├── README.md                     # 说明文档
├── webpack.config.js             # webpack 配置文件
├── yarn-error.log                # yarn 日志文件
└── yarn.lock                     # yarn 版本锁

```
## 使用脚手架

- 首先安装gt工具

```bash
$ npm i -g granturismo
```

- 添加脚手架

```bash
$ gt config add react-scaffold https://github.com/cq5282000/react-scaffold.git
```

- 预案曾新建工程，同步到本地然后在根目录下执行

```bash
$ gt init
```

- 然后选择react-scaffold,初始化工程

- 安装

```bash
$ yarn install
```

- 运行

```bash
$ yarn run dev
```

- webstorm 记得打开eslint

然后就可以进行开发了。。。。

----------------------------------------------------阶段分割线-----------------------------------------------------------

# react-scaffold

## 脚手架更新日志 2017-09-06

第一次做一个脚手架，到今天为止，有个雏形了，更新记录一下，最终整个脚手架是为了做成webpack+react+es6+redux的形式，后期根据需要可能会考虑
引入react-router，按需加载的形式，我接下来详细说一下真个项目的搭建过程，算是这段时间的总结，接下来打算记录一下整个项目的搭建过程，避免遗忘，
同时学习交流

### 项目结构  babel-转码器

NPM项目的搭建就不说了，可以参考我的其他的github链接，这里整个项目的架包管理使用的是yarn，安装指令

```bash
$ yarn install
```

首先必须，babel转码器，需要做以下配置

- .babelrc是转码器配置文件,需要新建
- babel-preset-stage-0 是es6的转码规则，官方还提供了1，2，3，建议使用0，因为比如你是用2，某些修饰符，例::绑定修饰符，在项目中无法使用,
安装指令：

```bash
$ yarn add babel-preset-stage-0 --dev
```

- babel-preset-react 是react的转码规则，安装指令

```bash
$ yarn add babel-preset-react --dev
```

- babel-preset-es2015 es2015语法的转码规则，安装指令

```bash
$ yarn add babel-preset-es2015 --dev
```

- babel-register 改写require命令，为他加上一个钩子，每当使用require加载 .js, .jsx , .es ,.es6后缀名的文件，就会先用babel进行转码

```bash
$ yarn add babel-register --dev
```

使用是必须先加载babel-register,

```bash
$ require('babel-register')();
```

大家注意这里的使用方式require后加了一个（），用公司大佬的话说就是函数是一等公民，其实不加也可以用啦，我也不知道为什么要这样，就当作约定俗
成吧，哈哈哈哈

- babel-polyfill babel默认只转换心得javascript语法，而不转换新的API，例如Promise，以及一些定义在全局对象上的语法，安装指令

```bash
$ yarn add babel-polyfill --dev
```

## 脚手架更新日志 2017-09-07

### eslint -- 校验规则

eslint是编程规范的一个准则，在工程里引入eslint的话，需要在编译器里打开eslint检验，然后在工程的根目录下新建.eslintrc文件，这里使用的
eslint的版本是eslint-config-airbnb，安装指令如下：

```bash
$ yarn add eslint-config-airbnb --dev
```

若不能满足规则的话，可以在eslint的rules规则中自行添加规范

### gitignore

.gitignore文件可以设置上传到github的文件类型，一些本地编译或者安装生成的文件，没有必要上传到github，可以在此处做限制
 
### package.json 

是架包管理的文件，通过yarn命令或者npm命令安装的一些文件都可以在此找到，scripts可以设置编译和运行命令，此文件无需手动创建，通过npm init
指令生成，此处不做赘述，其他github有详细介绍

### webpack配置

webpack.config.js是webpack的配置文件，关于webpack的详细说明大家可以参考文档，这里指详细说明一下我用到的配置，以及配置的整个修改过程，
我的整个工程一开始所有的配置如下

- 入口处就是最常规的配置，因为一开始还没有引入多文件，只使用单文件做测试，所以入口处的配置就是最简单的

```bash
$..........
      entry: {
          app: [
              './src/index-for-demo.js',
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


### 优化过程

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

### 待优化的 

- Minimal Entry Chunk

- Incremental Builds

- Production

- Multiple Compilations

- Specific Tooling Issues

- Worker Pool

- DllPlugin

以上待优化的项目目前对我的变加不加对我的项目没有太大影响，所以想不做优化，后期项目慢了会考虑下引入去做优化，

## BUG-fixed   2017年9月7号

- output.publishPath ：输出解析目录的文件，官方文档给出的是一个这样的回答，我仔细揣摩了好久，他跟path的区别，path可能只是打包后输出文件
的目标路径，但真正运行是加载的应该是publishPath目录下的东西，个人实践理解，不知道对不对。

- devServer.contentBase 告诉服务器从哪里提供内容，只有在你想要提供静态文件时候才需要，这句话是官方原话，没太听懂，我测试下来，感觉没太大
用，配不配没什么影响，

- devServer.publicPath - 此路径下的打包文件可在浏览器中访问，假设服务器运行在 http://localhost:8080 并且 output.filename 被设置为
 bundle.js。默认 publicPath 是 "/"，所以你的包(bundle)可以通过 http://localhost:8080/bundle.js 访问，这是官方文档原话，
 
- devServer.publicPath和output.publishPath必须要一样，切记切记，不然你HtmlWebpackPlugin打包的东西是加载不到的。

## 脚手架更新日志 2017年9月8号

### 修改文件目录 

脚手架的雏形已经具备，接下来主要是优化目录结构

- 把index.html放到template文件下，作为公共模版文件

- 所有的入口文件都放到src/entry/目录下

- 输出的devServer和output的publicPath全部都设成entry，HtmlWebpackPlugin的输出路径设成，html/[filename],这样所有输出的入口路径形式
就都成了 http://localhost:8080/entry/html/[filename].html,不要问我为什么写成这种形式，我看公司的脚手架都这种入口形式，入乡随俗吗。

### HtmlWebpackPlugin 注意点

稍微更新一下关于HtmlWebpackPlugin这个插件，多页面应用中，每个页面都要去配置HtmlWebpackPlugin,生成该界面对应的html文件，默认情况下，当
页面由多个入口时，HtmlWebpackPlugin会把所有的入口的JS文件打包在生成的html中，所以我们要通过chunks属性进行配置，每个html文件打包对应的js文件
这一点开发的时候尤其注意，不然就可能会出问题。

### 包的引入

- 引入rd去进行文件的搜索获取和处理，感觉挺好用的

### 写法更新

最终决定把配置写法更改成es6的写法，虽然这样做可能代码可读性不如原来直观了，但是这样会更规范，更容易处理各种情况，更容易扩展，好处多多，决定
跟随别人的一件改写一下，苦了要看代码的小伙伴了，我尽量多加注释,

- 新建了一个save-init分支来保存原来的东西

- 尽量遵循函数是第一公民原则

### 关于devServer BUG 记录

- devServer的stats可以设置输出日志信息选项

- 但是设置colors无效，其他都可以

- 端口只能设置成127.0.0.1,其他的都无效;

## 脚手架更新日志 2017年9月9号

### 引入模块热替换 HMR

- 今天修改了一下devServer的配置，stats设置成normal，去掉了一些多余的选项，
- 使用模块热替换的话，devServer的hot属性必须设置为true。
- plugins中引入webpack自带的HotModuleReplacementPlugin()插件，
- 如果不是使用CLI指令开发，而是使用memory存储webpack配置，new webpackDevServer(compiler）启动devServer的话，使用模块热替换，单个页
面的入口节点必须添加 "webpack-dev-server/client?http://localhost:8080/" ，"webpack/hot/dev-server"，切记，不要添加到公共的common，
按道理来说每个页面公共的入口节点添加到common是可以的，可是测试下来就是不可以，指定output.publicPath也非常重要，不然hot update chunks
可能无法加载，之前没有注意到这些问题，是因为之前使用的一直都是CLI指令设置的,webpack-dev-server --inline --hot,这种方式会自动设置入口
节点，所以之前一直都无法发现这个问题，这里记录一下，以后一定要注意

### 引入react-hot-loader

这个主要的作用是首先模块的不刷新就可以实时更新修改，非常炫酷的效果，但是感觉公司的大多数框架都没有实现，虽然都有这个配置，但是感觉开发的时候
还都在刷新，其实实现非常简单，

- 选定版本，这个使用react-hot-loader 3,不同版本的配置方式是不一样的哦，使用babel和es6开发的话，官方推荐是使用3.0的版本，之前使用1.3.1，
感觉好low，
- 安装3.0,指令如下

```bash
yarn add react-hot-loader@next
```
- .babelrc 的plugins中添加react-hot-loader/babel，
- 单个界面入口节点添加'react-hot-loader/patch',记住这里的react-hit-loader/pathch 入口节点必须添加在HMR的入口节点之后
- 如替换的内容需要包裹在<AppContainer/>中，并且用module.hot加载一下

再来补充两句，卧槽他妈的调试模块热加载的时候，突然发现自己原来配的东西又不行了，这个时候不要怀疑自己先，清空浏览器缓存，清空浏览器缓存，
清空浏览器缓存，what the fuck 为什么会有缓存这种东西，什么鬼，气死我了，浪费我一天找问题，fuck, fuck, fuck,看来是时候给项目装个清空浏览
器缓存的插件的时候了。。。明天再弄吧。

## 脚手架更新日志 2017年9月11号-12号

深切的体会到，学习的道路上有一个良师益友的重要性，他不一定真的牛到天上，但一定是要对你有帮助的，真的非常感谢歆琳不厌其烦的解答我各种问题，他
的讲课再加上他的博客，让我透彻的理解了redux，所以后期的开发，关于redux的引入，感觉已经没有阻碍了了，很顺利的感觉，还有高冷的烨大神只用两个
字每次只回答是或者不是，感谢叙鹏的指引，到今天为止，脚手架已经基本完成，但是有一个隐藏的坑，虽然还没做到，但是今天突发奇想的就想到了，然后验
证了一下，果然，就是reducer无法热更新，具体的解决方案后期再去想，怎么解决。

### 引入redux，react-redux

redux的具体原理不做详细说明，基本原则就是：
- store是唯一数据源，所有的state都存存储在store中，通过getState()读取显示。
- store是只读的，想要改变store，只能通过分派action，通过reucer修改，
- 创建store的时候需要传递一个函数签名reducer，这个reducer可以是单一的reduce，也可以是combineReducers，
- 原生的redux需要通过subscribe注册监听函数，每次当state改变的时候，会触发这个监听函数，所有页面显示的该改变的处理操作写在这个监听函数里
- react-redux提供了Provider和connect两个API，直接把组件的state和action creator映射到props上，这样我们就不用在注册监听函数，connect
封装了dispatc，我们也不用在手动去dispatch，可以说是整个工程的结构更加简洁明了
- 深入的理解redux的原理对于搭建脚手架必不可少，因为深入了解了原理，才能更好的规划结构，我整个搭建过程基本就是一开始只引入redu，跑通功能，然
后再去引入react-redu，集合原理，对比区别，优化目录结构

### 重组目录结构

- 新建actions目录，来存储所有的页面action，开发过程中最好每个界面都单独新建一个`${page-name}Action.js`的文件来存储单独的action，也可以
新建名为`${page-name}`的文件夹，然后在该文件夹下新建以页面中的所有组件为名的`${component-name}.js`文件来存储action，最后在每个文件夹下
新建index.js, 去输出所有的组件的action调用，个人感觉后者比较规范，我现在所有的开发不管是组件还是reduce，基本都是新建文件夹，用index.js
输出，关于action的写法，遵循函数式编程的规范，都用函数去return；

- reducer文件夹下，存储所有页面的reducer，最后用index.js去export,类似于action 的布局结构，大家根据偏好来，其实也没那么死，不过规范点肯
定没毛病
- 新建libs文件夹，去存储各种公共的方法，
- configs下去存储配置文件，比如 action的配置等等
- 所有业务组件的都存储在containers中
- 所有的展示组件都存储在conponents中

### 样式

- 引入css-loader,style-loader, postcss-loader来支持样式的引用
- 引入postcss-import来支持@import
- 新建样式文件的时候，组件对应的PCSS文件和组件写在一起，

### reducer的热更新

在烨大神的帮助下，最终成功的引入了reducer的热更新，现在深刻的明白了站在巨人的肩膀上的重要性。遇到了问题多问，切记死抠，多听听前人的经验，到
现在为止，已经差不多了，我的脚手架，已经成功引入了reducer的热更新。

- accept本质上接受的是文件的热更新，这个之前一直没有深刻理解，
- 一定要先更新reduce，再去替换store中的reducer，然后在rende，大功告成。

### 待做事项

- fetch请求
- 支持加载

---------------------------------------阶段分割线------------------------------------------------------------------------

## 脚手架更新日志 2017年9月19号

### 新增脚手架的fetch请求

- 改写了store的写法，尽量简化每一层的工作，更方便维护

- 加入redux-thunk中间件，来读写异步action

- 优化针对移动端的站点模版文件，加入viewport属性，响应式布局，满足不同设备屏幕和分辨率的需要

## 脚手架更新日志 2017年9月21号

### 环境变量

了解了下关于运行环境，有以下几点：

- process.env.ENV 是CI传进来的环境变量

- process.env.NODE_ENV 是自定义环境变量，

- CLI指令中的NODE_ENV是传递给webpcak.config.js的，生产环境中，可以直接通过process.env.ENV获取，

- 开发环境中是不存在process.env.NODE_ENV这个变量的，一般通过CLI指令传递，通过CLI指令传递的，只有通过webpack打包的文件才能获取到，

- 比如一般封装fetch请求的时候，需要根据环境变量去判断是直接取mock数据，还是远程请求，这时候是获取不到CLI传递过来的NODE_ENV,需要通过
definePlugin声明一个全局的变量NODE_ENV。

- 生产环境 process.env.ENV的值不是'production'而是'product'

封装fetch请求也一波三折

- fetch请求在development环境下是直接require的本地的mock数据

- 请求延迟是自己模拟的

- require('./list.json')可以获取数据，但是require('list.json')获取不到，这是因为resolve设置的问题，没有./是把路径解析成包，fetch真
实环境不好测试，封装了也不知道对错，碰到了问题联系微信号yingyangkuaixian11.

## 脚手架更新日志 2017年9月22号

### fetch请求完善

修改webapck的resolve配，加入路径解析的配置

- 设置了一下resolve，给组件和lib修改了引用的路径名称，感觉逼格会高一点,但是会报错，所以应该是放弃了

- fetch请求完善远程，但是还没有做差错处理，

## 脚手架更新日志 2017年9月23号

### 修改配置选项

- 没修改成功，放弃了，mark一下babel-preset-env,有问题，未解决