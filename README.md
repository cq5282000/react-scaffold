# react-scaffold

## 脚手架更新日志 2017-09-06

第一次做一个脚手架，到今天为止，有个雏形了，更新记录一下，最终整个脚手架是为了做成webpack+react+es6+redux的形式，后期根据需要可能会考虑
引入react-router，按需加载的形式，我接下来详细说一下真个项目的搭建过程，算是这段时间的总结，从5秒优化到200-300ms，目前编译时间测是测是
250多秒左右，是我现在暂时优化的极限，接下来打算记录一下整个项目的搭建过程，避免遗忘

## 项目结构

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