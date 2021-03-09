

## 产生背景

随着前端的工程化普及 单独新建几个文件编写业务代码已经不能满足日益增长的需求和可维护性了 我们通过拆分不同的业务模块 然后单独的引入这些个模块 没个模块自己做自己的事情 就可以保证的项目的维护性以及可扩展性 如果开发一个大型的项目 具有成千上万个模块 我们可以在一个 单独的文件的中分别引入这些模块吗 ?? 所以我们需要借助工具完成的这个事情 [webpakc](https://www.webpackjs.com/) 就是这样的一个工具

与 web pack  相似的工具还有很多 如: grunt culp browserify  但是以市场的趋势来看 weboack 这两年的使用趋势直线上升 前端的三大主流框架 Vue React Angular 也在开始使用 webpack 作为地层的代码的构建工具 得益于 webpack 实现了其他工具无法实现的功能。 如 Tree Shaking、代码懒加载、代码分割... 所以使用 webpack 作为前端代码的构建工具已经是前端开发的共识了。 学会 webpack 会从前端工程化的角度思考前端工程化的问题。学会 webpack 之后会发现在代码的背后其实另有洞天。也会极大的扩充前端开发的视野。

webpack4 相较于之前的代码版本有了更深层次的变化 大型项目的构建时间节约了 90% 构建时间 也内置了许许多多的内置 API。

## 代码编写方式的演进

我们先来看下原始的代码编写方式

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>这是原始网页内容</title>
</head>
<body>
    <p>这是最原始的网页的内容</p>
    <div id="root"></div>
    <script src="index.js"></script>
</body>
</html>

```

```javascript
var dom = document.getElementById('root')

// 创建头部
var header = document.createElement('div')
header.innerText = 'header'
dom.appendChild(header)

// 创建侧边栏
var sidebar = document.createElement('div')
sidebar.innerText = 'sidebar'
dom.appendChild(sidebar)

// 创建内容区
var content = document.createElement('div')
content.innerText = 'content'
dom.appendChild(content)

```

![image-20201023202941349](/Users/xiaojianjian/Library/Application Support/typora-user-images/image-20201023202941349.png)

从以上的方式可以看见 创建的内容全部堆放在在一个文件里面 这样这个的文件的可能就很长 以至于后期代码的维护可能困难 后台演化成为了 面向对象的方式存放代码

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>这是原始网页内容</title>
</head>
<body>
    <p>这是最原始的网页的内容</p>
    <div id="root"></div>

    <script src="header.js"></script>
    <script src="sidber.js"></script>
    <script src="content.js"></script>
    <script src="index.js"></script>
</body>
</html>
```

```javascript
function Content(dom) {
    var content = document.createElement('div')
    content.innerText = 'content'
    dom.appendChild(content)
}
```

```javascript
function Sideber(dom) {
    var sideber = document.createElement('div')
    sideber.innerText = 'sideber'
    dom.appendChild(sideber)
}
```

```javascript
function Header(dom) {
    var header = document.createElement('div')
    header.innerText = 'header'
    dom.appendChild(header)
}
```

```javascript
var dom = document.getElementById('root')

new Header(dom)
new Content(dom)
new Sideber(dom)
```

通过这样的方式就把不同部分的业务逻辑拆分到了不同的文件中 可以单独维护指定部分的代码 但是也依旧产生了很多的问题

+ Html 文件的存放了很多 js 文件 在加载这些个文件的时候 也会相应拖慢页面的文件的展示
+ 在 index.js 文件中 并不能立马就看到指定的文件的方法在哪 需要手动的查找
+ 很难查错 一个文件加载失败 可以会出现未知的错误

如何处理以上的问题呢??

我们可以使用借鉴 java 语言的 import 语句 在主文件的 index.html 文件中 依旧只引入 index.js 文件 在 index.js 文件中

```javascript
// ES Modules 模块方式的引入
import Content from './content'
import Sidber from './sidber'
import header from './header'

const dom = document.getElementById('root')

new Content(dom)
new Sidber(dom)
new Header(dom)
```

这样就解决了 以上的问题

但是以上文件中的语法在浏览器中是不被支持的 所以我们需要借助 webpack 工具 所以我们写下来会详细的解说 webpack 工具的使用

## webspack 究竟是什么

Webpack 是一个模块打包构建工具

```javascript
// ES Modules 模块方式的引入
import Content from './content'
import Sidber from './sidber'
import header from './header'

const dom = document.getElementById('root')

new Content(dom)
new Sidber(dom)
new Header(dom)
```

诸如以上代码 webpack 可以通过识别 import 的语法【import 后的代码称为一个模块】 webpack 可以把以上模快打包放在一起 这样生成了一个完整的文件 所以 【**webpack 就是一个模块打包构建工具**】

## js 的模块引入规范

+ ES Moudule import 规范
+ ComminJS  node 引入规范
+ CMD
+ AMD

webpack 都可以把以上的规范构建成为一个完成的代码

任务: 

+ 阅读 [webpack 模块内容](https://www.webpackjs.com/concepts/modules/#%E4%BB%80%E4%B9%88%E6%98%AF-webpack-%E6%A8%A1%E5%9D%97)
+ 阅读 [webpakc 模块API](https://www.webpackjs.com/api/module-methods/)

## webpack 环境构建

+ 安装 [node](https://nodejs.org/en/)

  + 运行 **node -v** 如果出现版本号 node  安装成功
  + 运行 **npm -v** 如果出现版本号 npm 安装成功

+ 创建文件夹并在终端进入文件夹

+ 运行 **npm init --y** 创建 node 包管理工具 初始化完成可以在文件夹下看到 **package.json** 文件

  ```json
  {
    "name": "webpack-demo", //项目名
    "version": "1.0.0", // 版本号
    "description": "", // 项目数说明
    "main": "index.js", // 主文件
    "private": false, // 是否开源
    "scripts": { // 命令脚本
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": [],
    "author": "", // 作者
    "license": "ISC" // 开源协议
  }
  ```

+ 安装 webpakck

  + webpack 安装可以分为全局安装(-g)和项目安装(-d)[推荐 **项目安装**]

    + 全局安装: 

      ```powershell
      npm install webpack -g # 安装 webpack
      npm install webpack-cli -g # 安装 webpack-cli [在全局命令行中正确的认识 webpack 这个命令]
      
      # 也可以组合一句命令
      npm install webpack webpack-cli -g
      
      webpack -v # 出现版本号就意味着 全局安装成功
      
      # 全局卸载 webpack webpack-cli
      npm uninstall webpack -g
      npm uninstall webpack-cli -g
      
      # 也可以组合一句命令
      npm uninstall webpack webpack-cli -g
      ```

    + 项目安装

      ```powershell
      npm install webpack -save-dev # 安装 webpack
      npm install webpack-cli -save-dev # 安装 webpack-cli
      
      # 也可以组合一句命令
      npm install webpack webpack-cli -save-dev
      
      npx webpack -v # 出现版本号就意味着 全局安装成功
      
      # 卸载 webpack webpack-cli
      npm uninstall webpack -save-dev
      npm uninstall webpack-cli -save-dev
      
      # 也可以组合一句命令
      npm uninstall webpack webpack-cli -save-dev
      ```

知识点: npx 命令 可以调用 node_modues 下 bin 名录的命令



## webpack 配置

webpack 是一个构建工具 可以打包不同的文件 打包 js 文件和打包 css 文件以及打包 图片文件的时候, 必然会采用不同的打包方式 甚至可以制定打包入口以及打包出口文件的相关信息 所以我们需要**通过配置文件制定不同文件的打包方式**

Web pack 默认会找项目的根目录下的 webpack.config.js 文件 如果制定了就使用 webpack.config.js 文件中的配置做项目的打包 没有就使用默认方式进行项目的打包

我们可以在项目的根目录下新建 **webpack.config.js** 文件 并在添加以下配置:

```javascript
const path = require('path')

module.exports = {
	entry: './index.js', 												// 指定文件的入口
	output: {																		// 指定文件的出口
		filename: 'bundle.js',										// 指定打包的文件名称
		path: path.resolve(__dirname, 'bundle')		// 指定打包文件的目录[绝对路径]
	}
}
```

这样通过

```shell
npx webpack ['会默认使用 webpack 默认配置']
```



 之后webpack 就会读取配置文件中的配置信息构建项目。 但是如果我们创建了一个文件夹存放 webpack 配置文件 又如何制定 webpack 的配置文件呢?? 可以通过 

```shell
npx webpack --config 指定文件目录和文件名称
```



## 配置 npm run build 指令

在实际项目开发中我们会通过配置不同命令 指定来操作项目

```shell
npm run start || npm run build
```

 这是如何办到的?? 

我们打开项目中 package.json 文件 在 scripts 节点下配置

![image-20201127165346824](/Users/huozhuoyigeliuxiaojian/Library/Application Support/typora-user-images/image-20201127165346824.png)

+ 打包的 chunks['每个文件的具体ID'] 和 chunksNames ['每个具体文件的名称']
+ 打包完成默认的场景【开发环境】根配置下配置 mode 值为 一下两种
  + 开发环境 development
  + 生产环境 production



### loader [loader 执行顺序 从下到上 从右到左]

在实际项目的开发过程中 我们会遇到许许多多的模块 这个模块包括 **html css js 图片 **等资源 webpack 默认只会处理 js 文件 哪如何去整合这个模块呢 => 采用 loader  在配置文件中继续配置相关的 loader 配置

在 output 同级下配置 module 节点 {} 在里面配置 处理规则 rule 使用到什么 loader 就需要安装

打包流程如果发现有的文件无法打包 所以求助于 module -> rule 规则方案 

```shell
module: {
  rules: []
}
```

+ File-loader

```javascript
{
    test: /\.(jpg|gif|png)$/,
    use: {
      loader: 'file-loader',
      options: {
        // 使用原来的文名称以及后缀 [name] [ext] 这是占位符
        // https://webpack.js.org/loaders/file-loader/#options
        name: '[name].[ext]',
        // 打包放置的位置
        outputPath: 'images/'
      }
    }
  }
```

```shell
npm install file-loader -D
```

+ Url-loader

  ```powershell
  {
      test: /\.(jpg|gif|png)$/,
      use: {
        loader: 'url-loader',
        options: {
          // 使用原来的文名称以及后缀 [name] [ext] 这是占位符
          // https://webpack.js.org/loaders/file-loader/#options
          name: '[name].[ext]',
          // 打包放置的位置
          outputPath: 'images/',
          limit: 1024
        }
      }
    }
  ```

  ```powershell
  npm install url-loader -D
  ```

+ Css-loader style-loader

  ```powershell
  rules: [
              {
                  test: /\.css$/,
                  use: ['style-loader', 'css-loader']
              }
          ]
  ```

  ```powershell
  npm install css-loader style-loader -D
  ```

+ Sass[scss-loader ] 语法加浏览器的兼容前缀[postcss-loader] 

  ```javascript
  {
    test: /\.scss$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2, // 前面还有几个loader
            modules: true // 配置 css modules
          }
        },
        'sass-loader', 'postcss-loader'
      ]
  }
  ```

  ```powershell
  npm install sass-loader node-sass postcss-loader -D
  ```

  在项目的根目录下创建 **postcss.config.js** 文件 安装 **autoprefixer**

  [postcss.config.js](https://github.com/webpack-contrib/postcss-loader)

  ```powershell
  npm install autoprefixer -D
  ```

  ```javascript
  module.exports = {
    plugins: [
      require('autoprefixer')
    ]
  }
  ```

+ 字体文件打包 [file-loader] 将字体文件打包进编译之后的包中

  ```javascript
  {
    test: /\.(eot|ttf|svg)$/,
      use: {
        loader: 'file-loader'
      }
  }
  ```

  

常见的 loader 模块

+ file-loader 处理文件 单独存放
+ Url-loader 处理文件 参考 limit 值 大于就单独存放 小于就集成到js
+ style-loader 会把 样式打包到 head 标签里面
+ css-loader 整合 css 
+ Sass-loader 使用 scss 语法





## 插件 plugins

插件的作用就是在 webpack 的生命周期中 增加新的功能

+ **HtmlWebpackPlugin** 在编译完成之后自动生成 index.html 文件

  ```powershell
  yarn add html-webpack-plugin
  ```

  ```javascript
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  
  new HtmlWebpackPlugin({
    template: 'src/assets/index.html' // 制定模版
  }),
  ```

+ **clean-webpack-plugin** 在变异开始之前清楚目录下的所有文件

  ```shell
  yarn add clean-webpack-plugin
  ```

  ```javascript
  const { CleanWebpackPlugin } = require('clean-webpack-plugin')
  
  new CleanWebpackPlugin()
  ```

  



## Entry 和 Output 的基础配置

+ Entry 

  + entry: './index.js' === entry { main: './index.js' } 可以在对象中配置多个属性 通过这个属性就可以打包成为多个文件

+ Output

  + ```javascript
    output: {
      filename: '[name].js', // 生成 Entry 对象属性的文件
      path: path.resolve(__dirname, 'dist') ,
      publicePath: 'http://cdn.com.cn' // 打包的文件生成 cdn 地址
    }
    ```





## [SourceMap](https://webpack.js.org/configuration/devtool/) 配置 【主要是生产环境】

SourceMap 打包的文件中 如果出现代码的错误 可以在浏览器的控制台查看和寻找对应的原文件

SourceMap 是一个映射关系 打包的文件映射源文件 就可以快速的定位源文件的错误位置



### 配置

```javascript
devtool: 'source-map'
```

其他配置值

+ **source-map** 会构建打包文件和源文件映射关系 会生成 .map 后缀的文件
+ **inline-source-map** 构建的映射关系的文件会打包进代码文件中 base64 格式的文件 会精确到错误文件列
+ **cheap-inline-source-map** 只需要告知精确到那行即可 不需要精确到那个列
+ **cheap-inline-module-source-map** 可以精确到指定第三方的loader 文件中代码的异常
+ **cheap-module-evel-source-map** 【开发环境推荐】提提示比较友好
+ **cheap-module-source-map** 【生产环境推荐】





## [WebpackDevServer](https://webpack.js.org/configuration/dev-server/#devserver) 提升开发效率

+ 保存就自动生成最新的代码 不用编译 package.json 配置命令

  ```javascript
  "watch": "webpack --watch" // --watch 启动监听
  ```

+ 使用 WebpackDevServer 完成更多的配置内容 【自动开启浏览器等...】

  + 安装

    + ```javascript
      yarn add webpack-dev-server
      ```

  + 配置

    + ```javascript
      devServer: {
        	contentBase: './dist', // 监听目录
          open: true, // 打开浏览器
          port: 3000 // 端口
      }
      ```

    + ```javascript
      "start": "webpack serve --config ./config/webpack.dev.js"
      ```



## Hot module Replacement 热模块替换

希望新生成的代码【css 或者 js】只是替换原有样式和局部的代码 而不需要全部替换

```javascript
devServer: {
  	contentBase: './dist', // 监听目录
    open: true, // 打开浏览器
    port: 3000, // 端口
    hot: true, // 开启 Hot module Replacement 功能
    httpOnly: true // 即便 html 功能不生效 也无需刷新浏览器
}
```

```javascript
const webpack = require('webpack')

new webpack.HotModuleReplacementPlugin()
```



代码中监控模块的变化 【前提 开启了 Hot】 通常情况下 loader 中已经处理了 模块变化代码

```javascript
if(module.hot) {
  module.hot.accept('./number', () => {})
}
```

+ [Hot module Replacement](https://webpack.js.org/guides/hot-module-replacement/)





## 处理 ES6 以上的新版本的语法

在没有做代码的转换处理之前 生成的代码默认只会是能在高版本的浏览器中运行 低版本的浏览器不支持 所以在项目中需要做代码的转换 生成低版本的浏览器支持的代码

+ 安装 babel 库

  + ```javascript
    yarn add babel-loader @babel/core
    ```

  + ```javascript
    {
      test: /\.js$/,
      exclude: /node_modules/, // 取消 node_modules 中的文件
      loader: "babel-loader"
    } // 将 babel 和 webpack 桥梁打通 不是真正的在翻译代码
    ```

  + ```javascript
    yarn add @babel/preset-env // es6 翻译称为 es5 的翻译规则
    ```

  + ```javascript
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader",
      options: {
        presets: ['@babel/preset-env']
      }
    } 
    ```

  + 虽然以上配置已经可以实现代码的翻译的 但是对于低版本浏览器本身不提供的新版本语法和 API 所以在实际需要中是高版本语法API 也一起打包到代码中 【只需要项目的业务代码的需要的API】借助 [babel/polyfill](https://www.babeljs.cn/docs/babel-polyfill)

  + ```javascript
    yarn add @babel/polyfill
    ```

  + 在业务代码中之前 引入 【注: polyfill 会污染全局环境】

    ```javascript
     import "@babel/polyfill";
    ```

  + 这样的方式存在缺陷 就是会把整套 API 全部打包进文件中 实际可能会用不到 只希望与打包用到的 API

  + useBuiltIns 配置过后就不需要在 import "@babel/polyfill" 会自动的引入

  + ```javascript
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader",
      options: {
        presets: [['@babel/preset-env', {
          useBuiltIns: 'usage' // 只添加遇到的代码
        }]]
      }
    } 
    ```

  + [其他配置](https://www.babeljs.cn/docs/usage)

  + ```javascript
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader",
      options: {
        presets: [['@babel/preset-env', {
          "targets": {
              "edge": "17",
              "firefox": "60",
              "chrome": "67",
              "safari": "11.1",
            },
          useBuiltIns: 'usage' // 只添加遇到的代码
        }]]
      }
    } 
    ```

+ 开发的内容第三方的类库或者第三方模块的配置

  + [参考文件](https://www.babeljs.cn/docs/babel-plugin-transform-runtime)

  + 安装 **@babel/plugin-transform-runtime** 【注: 以闭包的形式注入或者间接帮助组件引入内容 不存在全局污染】

    ```javascript
    yarn add @babel/plugin-transform-runtime
    ```

  + 安装 **@babel/runtime**

    ```javascript
    yarn add @babel/runtime
    ```

  + Js loader 配置

    ```javascript
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader",
      options: {
      "plugins": [[
          "@babel/plugin-transform-runtime",
          {
            "absoluteRuntime": false,
            "corejs": false, // 2
            "helpers": true,
            "regenerator": true,
            "useESModules": false,
            "version": "7.0.0-beta.0"
          }
        ]]
    	}
    } 
    ```

    如果 corejs 的属性值是2 还需要安装其他的包 

    ```javascript
    yarn add @babel/runtime-corejs2
    ```

    

+ 从以上的配置项中可以看出 js-loader 配置项非常的多 如何解决 => 使用 .babelrc 文件方式注入 

  + 创建 .babelrc 的文件

  + 将 loader 中的 options 中的代码全部拿出 以 json 文件的方式写入到文件中

    ```json
    {
      "plugins": [[
          "@babel/plugin-transform-runtime",
          {
            "absoluteRuntime": false,
            "corejs": false, // 2
            "helpers": true,
            "regenerator": true,
            "useESModules": false,
            "version": "7.0.0-beta.0"
          }
        ]]
    	}
    ```

    ```javascript
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader",
    } 
    ```

+ 配置 [React](https://www.babeljs.cn/docs/babel-preset-react) 打包环境

  + loader 配置

    ```javascript
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader",
    } 
    ```

  + Babelc 配置 执行顺序 自右向左 自下向上

    安装 

    ```javascript
    yarn add @babel/preset-react
    ```

    ```javascript
    {
        presets: [
          ['@babel/preset-env', {
          	"targets": {
                "edge": "17",
                "firefox": "60",
                "chrome": "67",
                "safari": "11.1",
            	},
          	useBuiltIns: 'usage' // 只添加遇到的代码
        	}],
        	"@babel/preset-react"
        ]
      }
    ```

    



## Tree shaking 【webpack 2.0 以上】

在项目的实际开发中我们只希望为使用了什么方法就打包使用的方法 没有使用到的方法就不用打包到项目中 把不需要的代码剔除的过程为 Tree shaking

+  注： 只支持 ES module 方式的引入

+ 配置 

  + webpack.config.js

  ```javascript
  optiomization: {
    usedExports: true // 只打包使用到的
  }
  ```

  + Package.json

  ```javascript
  // 如果没有使用到 @babel/polly-fill 这类似的库 就可以 设置称为 false 对所有的代码都进行 Tree shaking
  "sideEffects": false  // ["@babel/polly-fill"]
  
  // 遇到 css 类似的文件不需要进行 过滤 如果过滤 可能还有额外的问题产出
  "sideEffects": ["*.css"]
  ```

+ 注意事项

  + 在生产环境下  不用配置 webpack.config.js 中的 Tree shaking 配置 自动配置好了 但是 package.json 中依旧需要配置
  + 支持 Tree shaking
    + 具名导入(支持 tree-shaking) **import { debounce } from 'lodash'**
    + 直接导入具体的模块 (支持 tree-shaking) **import debounce from 'lodash/lib/debounce'**
  + 不支持
    + // 全部导入 (不支持 tree-shaking) import _ from 'lodash';

  



## Development 和 Production 不同模式的区分打包

+ 开发模式

  + 需要 devServer 服务器
  + SourceMap 是非常全的
  + 代码可以不被压缩

+ 生产模式

  + SourceMap 不是那么的重要
  + 希望被压缩

+ 不同环境下的配置文件

  + 生产

    ```javascript
    const path = require('path')
    
    const HtmlWebpackPlugin = require('html-webpack-plugin')
    const { CleanWebpackPlugin } = require('clean-webpack-plugin')
    
    module.exports = {
    	mode: 'production',
    	devtool: 'cheap-module-source-map',
    	entry: './index.js',
    	output: {
    		filename: '[name].js',
    		path: path.resolve(__dirname, 'dist')
    	},
    	module: {
    		rules: [
    			{
    				test: /\.js$/,
    				exclude: /node_modules/,
    				loader: "babel-loader",
    				options: {
    					presets: [['@babel/preset-env', {
    						"targets": {
    							"edge": "17",
    							"firefox": "60",
    							"chrome": "67",
    							"safari": "11.1",
    						},
    						useBuiltIns: 'usage',
    					}]]
    				}
    			},
    			{
    				test: /\.(jpg|gif|png)$/,
    				use: {
    					loader: 'url-loader',
    					options: {
    						name: '[name]_[hash].[ext]',
    						outputPath: 'images/',
    						limit: 1024
    					}
    				}
    			},
    			{
    				test: /\.(eot|ttf|svg)$/,
    				use: {
    					loader: 'file-loader'
    				}
    			},
    			{
    				test: /\.scss$/,
    				use: [
    					'style-loader',
    					{
    						loader: 'css-loader',
    						options: {
    							importLoaders: 2,
    							modules: true
    						}
    					},
    					'sass-loader',
    					'postcss-loader'
    				]
    			}
    		]
    	},
    	plugins: [
    		new HtmlWebpackPlugin({
    			template: 'src/assets/index.html'
    		}),
    		new CleanWebpackPlugin(),
    	]
    }
    
    
    ```

    

  + 开发

    ```javascript
    const path = require('path')
    
    const HtmlWebpackPlugin = require('html-webpack-plugin')
    const { CleanWebpackPlugin } = require('clean-webpack-plugin')
    const webpack = require('webpack')
    
    module.exports = {
    	mode: 'development',
    	devtool: 'inline-cheap-module-source-map',
    	entry: './index.js',
    	output: {
    		filename: '[name].js',
    		path: path.resolve(__dirname, 'dist')
    	},
    	devServer: {
    		contentBase: './dist',
    		open: true,
    		port: 9000,
    		hot: true,
    		hotOnly: true
    	},
    	module: {
    		rules: [
    			{
    				test: /\.js$/,
    				exclude: /node_modules/,
    				loader: "babel-loader",
    				options: {
    					presets: [['@babel/preset-env', {
    						"targets": {
    							"edge": "17",
    							"firefox": "60",
    							"chrome": "67",
    							"safari": "11.1",
    						},
    						useBuiltIns: 'usage',
    					}]]
    				}
    			},
    			{
    				test: /\.(jpg|gif|png)$/,
    				use: {
    					loader: 'url-loader',
    					options: {
    						name: '[name]_[hash].[ext]',
    						outputPath: 'images/',
    						limit: 1024
    					}
    				}
    			},
    			{
    				test: /\.(eot|ttf|svg)$/,
    				use: {
    					loader: 'file-loader'
    				}
    			},
    			{
    				test: /\.scss$/,
    				use: [
    					'style-loader',
    					{
    						loader: 'css-loader',
    						options: {
    							importLoaders: 2,
    							modules: true
    						}
    					},
    					'sass-loader',
    					'postcss-loader'
    				]
    			}
    		]
    	},
    	plugins: [
    		new HtmlWebpackPlugin({
    			template: 'src/assets/index.html'
    		}),
    		new CleanWebpackPlugin(),
    		new webpack.HotModuleReplacementPlugin()
    	],
    	optimization: {
    		usedExports: true,
    	}
    }
    ```

  + 抽取 webpack 配置

    + 使用 **webpack-merge** 配置文件对工具配置代码进行合并

      ```javascript
      yarn add webpack-merge
      ```

    + 基础l

      ```javascript
      const path = require('path')
      
      const HtmlWebpackPlugin = require('html-webpack-plugin')
      const { CleanWebpackPlugin } = require('clean-webpack-plugin')
      
      module.exports = {
          entry: './index.js',
          output: {
              filename: '[name].js',
              path: path.resolve(__dirname, '../dist')
          },
          module: {
              rules: [
                  {
                      test: /\.js$/,
                      exclude: /node_modules/,
                      loader: "babel-loader",
                      options: {
                          presets: [['@babel/preset-env', {
                              // "targets": {
                              //     "edge": "17",
                              //     "firefox": "60",
                              //     "chrome": "54",
                              //     "safari": "11.1",
                              // },
                              useBuiltIns: 'usage',
                          }]]
                      }
                  },
                  {
                      test: /\.(jpg|gif|png)$/,
                      use: {
                          loader: 'url-loader',
                          options: {
                              name: '[name]_[hash].[ext]',
                              outputPath: 'images/',
                              limit: 1024
                          }
                      }
                  },
                  {
                      test: /\.(eot|ttf|svg)$/,
                      use: {
                          loader: 'file-loader'
                      }
                  },
                  {
                      test: /\.scss$/,
                      use: [
                          'style-loader',
                          {
                              loader: 'css-loader',
                              options: {
                                  importLoaders: 2,
                                  modules: true
                              }
                          },
                          'sass-loader',
                          'postcss-loader'
                      ]
                  }
              ]
          },
          plugins: [
              new HtmlWebpackPlugin({
                  template: 'src/assets/index.html'
              }),
              new CleanWebpackPlugin(),
          ],
      }
      
      ```

  + 开发

    ```javascript
    const webpack = require('webpack')
    const { merge } = require('webpack-merge')
    const baseConfig = require('./webpack.base')
    
    const devConfig = {
        mode: 'development',
        devtool: 'inline-cheap-module-source-map',
        devServer: {
            contentBase: './dist',
            open: true,
            port: 9000,
            hot: true,
            hotOnly: true
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ],
        optimization: {
            usedExports: true,
        }
    }
    
    module.exports = merge(baseConfig, devConfig)
    
    ```

  + 生产

    ```javascript
    const { merge } = require('webpack-merge')
    const baseConfig = require('./webpack.base')
    
    const productionConfig = {
    	mode: 'production',
    	devtool: 'cheap-module-source-map',
    }
    
    module.exports = merge(baseConfig, productionConfig)
    
    ```

    

## Code splitting 代码分割

在实际项目的开发过程中 如果打包生成的文件特别的大 加载时间会特别的长 

所以会把业务代码打包生成 框架代码 业务代码



代码分割的方式

+ 同步代码 只要配置 optimization 即可

  ```javascript
  optimization: {
    splitChunks: {
      chunks: 'all', // 切割方式 all 所有 async 异步 initial 同步
        minSize: 300000, // 文件大小
          minChunks: 1, // 公共模块使用次数
            maxAsyncRequests: 5, // 同时加载的模块库
              maxInitialRequests: 3, // 入口的代码分割次数
                automaticNameDelimiter: '~', // 连接符
                  cacheGroups: {
                    vendors: {
                      test: /[\\/]node_modules[\\/]/,
                        priority: -10,
                          // filename: '[name]_[hash]_[id].js'
                    },
                      default: {
                        minChunks: 2,
                          priority: -20,
                            reuseExistingChunk: true,
                              // filename: '[name]_[hash]_[id].js'
                      }
                      }
                    }
                  },
  ```

+ 异步代码 无需配置 会自动进行代码分割 默认会生成一个文件 一个文件名称是一个打包的编号

  + 可以使用魔法注释标示当前的异步应用的代码

    ```javascript
    // 魔法注释
    return import(/* webpackChunkName: "loadsh"  */ 'loadsh').then(({ default: _ }) => {
      const element = document.createElement('div')
      element.innerHTML = _.join(['Dell', 'Lee'], '-')
      return element
    })
    ```

  + 如果魔法注释需要起效过 就必须要配置 babel 否则不生效

  + 安装

    ```javascript
    npm install --save-dev @babel/plugin-syntax-dynamic-import
    ```

  + 配置

    ```javascript
    {
      test: /\.js$/,
        exclude: /node_modules/,
          loader: "babel-loader",
            options: {
              presets: [['@babel/preset-env', {
                // "targets": {
                //     "edge": "17",
                //     "firefox": "60",
                //     "chrome": "54",
                //     "safari": "11.1",
                // },
                "corejs": "3",
                useBuiltIns: 'usage',
              }]],
                plugins: ['@babel/plugin-syntax-dynamic-import']
            },
    }
    ```

    



## Lazy Loading 懒加载 Chunk 是什么

```javascript
function getComponent() {
    return import(/* webpackChunkName: "xiaojianjian" */ 'loadsh').then(({ default: _ }) => {
        const element = document.createElement('div')
        element.innerHTML = _.join(['Dell', 'Lee'], '-')
        return element
    })
}

document.addEventListener('click', () => {
    getComponent().then(element => {
        document.body.appendChild(element)
    })
}, false)
```

打包两个 js 文件只有一个文件被夹在 另外一个文件不会加载 只有点击的时候触发才会被加载

Chunk 打包的目的文件 被切割的文件





## 打包分析

生成打包的分析的 json 文件

> ```
> "build": "webpack --profile --json > bunid.json --config build/webpack.production.js"
> ```

运行指令过后就会生成 json 文件

+ http://webpack.github.io/analyse/
+ https://webpack.js.org/guides/code-splitting/#bundle-analysis





## css 代码抽离和压缩

```javascript
output: {
  filename: '[name].js', // 生成的主文件会以 <script></script> 标签的方式引入
  chunkFilename: '[name].chunk.js', // 生成的文件会以 js 文件加载方式引入
    path: path.resolve(__dirname, '../dist')
},
```



通过现目前的打包配置 打包中的 css 文件打包到 js 文件当中 而没有生成 单独的 css 文件 

如果需要生成单独的 css 文件 需要借助 [mini-css-extract-plugin](https://webpack.js.org/plugins/mini-css-extract-plugin/) 插件

注意: 这个插件会没有很好的热更新的支持 所以只能配置到生产环境

安装

```shell
yarn add mini-css-extract-plugin -D
```

配置 webpack.config.js

```javascript
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

{
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader'
				]
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin()
	]
}
```

配置 package.json 对css 文件不做 Tree shaking

```json
"sideEffects": [
    "*.css"
  ]
```

#### 压缩 css 代码

```shell
yarn add css-minimizer-webpack-plugin -D
```

```javascript
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

optimization: {
		minimize: true,
		minimizer: [
			new CssMinimizerPlugin(),
		],
	},
```



## 浏览器缓存

```javascript
performance: false // 取消警告[主要打包时候 性能问题]
```

```javascript
output: {
  filename: '[name]_[contenthash].js',
  chunkFilename: '[name]_chunk_[contenthash].js', // 不会直接生成连接在 html 中 通过 main 加载
},
```

**contenthash** 在打包的文件中当生更改的时候就会把 文件冲的 hash 指纹重新生成 而不更改



## Shimming

```javascriptconst webpack = require('webpack')
const webpack = require('webpack')

new webpack.PrefetchPlugin({
	$: 'Jquery',
	_: 'loadsh', // 配置库
	_join: ['loadsh', '_'] //配置方法
})
```

这样 就会在每个模块当中自动的引入 Jquery 的库 在模块当中就不用再次引入

**注意：** 如何把每个模块中的 this 指向 window [**默认指向当前的库本身**]

使用 **imports-loader**

```javascript
yarn add imports-loader -D
```

```javascript
{
  test: /\.js$/,
    exclude: /node_modules/,
    use: [{
      loader: 'babel-loader'
    }, {
      loader: 'imports-loader?this=>window'
    }]
},
```





## 环境变量

```javascript
modules.exports = env => {
  if(env && env.preoduction) {
    return merge(baseConfig, productionConfig)
  }
  return merge(baseConfig, devConfig)
}
```

```json
"build": "webpack --env NODE_ENV=develop --config webpackConfig/webpackClientConfig.js"
```





## 打包 Library 【函数库 组件库】

```javascript
output: {
  filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
    library: 'library', // CommonJS AMD 就可以支持了
    libraryTarget: 'umd' // <script></script> 标签方式 'this' 'window' 指向 this
},
//// 告知客户端开发当前这个库的时候使用到了什么库 要现在客户端引入
// 打包的时候不会吧当前的 loadsh这个库打包到文件中  
externals: ['loadsh'], 
```





## PWA 【插件 可以实现 PWA 的技术】

```javascript
yarn add workbox-webpack-plugin -D
```

```javascript
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')

new WorkboxWebpackPlugin.GenerateSW({
  clientsClaim: true,
  skipWaiting: true,
})
```





## 配置 Typescript

```typescript
class Greeter {
    greeting: string
    constructor(message: string) {
        this.greeting = message
    }
    green() {
        return `Hello, ${this.greeting}`
    }
}

let greeter = new Greeter(123)

alert(greeter.green())
```



安装 ts-loader

```shell
yarn add ts-loader -D
```

```javascript
{ test: /\.ts?$/, use: 'ts-loader', exclude: /node_modules/}
```

要想正确的使用 就必须存在 typescript.json 文件

```json
{
  "compilerOptions": {
    "outDir": "./dist",
    "module": "ES6",
    "target": "ES5",
    "allowJs": true,
  }
}
```

+ 查找类型文件 [typescriptlang](https://www.typescriptlang.org/dt/search?search=)



## 使用 webpackDevServer 实现数据转发



## 在 webpack 中使用 EsLint 配置

EsLint 可以规范项目中的代码约束规范

安装

```javascript
yarn add eslint -D
```

运行配置文件

```javascript
npx eslint --init
```

根据提示选择安装项目 Eslint 配置

+ https://www.jianshu.com/p/6f7a84e570aav
+ https://trainspott.in/2018/12/07/vscode+vetur+eslint+prettier%E5%AE%9E%E7%8E%B0%E5%9B%A2%E9%98%9F%E4%BB%A3%E7%A0%81%E9%A3%8E%E6%A0%BC%E7%BB%9F%E4%B8%80/

```javascript
rules: {
        // 配置缩进
        indent: ['error', 4],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'react/jsx-filename-extension': 'off',
    },
```





## 打包大型项目方法

+ 跟上速度上迭代 node webpack yarn npm 。。。

+ 在尽可能少的模块上应用 loader 

  ```javascript
  {
    test: /\.js$/,
    exclude: /node_modules/,
    include: path.resolve(__dirname, '../src') //只对指定文件夹下的文件有效
    loader: "babel-loader",
  }
  ```

+ 开发环境下的插件么必要放在生产环境下 如: webpackDevServer

+ 配置 resolve 

  ```javascript
  resolve: {
  	extensions: ['.js', '.jsx'], // 寻找文件
  	mainFields: ['index', 'child'], // 以默认文件的引入
    alias: {
      '@': path.resolve(__dirname, '../src'),
      '@component': path.resolve(__dirname, '../src/components'),
    },
  },
    
  ```

  将第三方的资源整体打包成一个文件 后期引入即可

  单独生成一个打包文件 单独打包 第三方的模块

  ```javascript
  const path = require('path');
  
  module.exports = {
      mode: 'production',
      entry: {
          react: ['react'],
          reactDom: ['react-dom'],
          classnames: ['classnames'],
      },
      output: {
          filename: '[name].dll.js',
          path: path.resolve(__dirname, '../dll'),
          library: '[name]',
      },
  };
  
  ```

  打包之后将文件引入到页面即可 在服务器上加强制缓存 不用回后期更新

  装一个插件 **add-seset-html-webpack-plagin**s