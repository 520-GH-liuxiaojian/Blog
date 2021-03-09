# nodeJs



## Es 和 NodeJs 之间的区别

+ Es
  + 定义了语法 编写 Js 和 node 都必须遵守
  + 变量定义 循环 判断 函数
  + 原型和原型链 作用域 必包 异步。。。
  + 不弄够操作 DOM 不能监听事件 Ajax 请求 不能处理 http 网络请求
+ Js
  + 使用 Es 语法规范 WebApi 事件绑定 Ajax
+ Node 
  + 使用 Es 规范 外加 NodeJs Api 缺一不可
  + 处理 http 处理文件



## Node 模块化 commonJs 规范

common 模块化可以把代码进行拆分 单独管理 从而符合开放封闭原则

+ 使用 module.exports 导出模块
+ 使用 require 引入模块

代码

```javascript
function add(a, b) {
    return a + b
}

module.exports = { add }
```

```javascript
const { add } = require('./a.js')

console.log(add(10, 20))
```



## debugger 代码进行调试

node 项目使用 **yarn init -y **或者 **npm init -y** 初始化为一个 node 项目 在初始化的 package.json 文件中有 main 属性 这是调试代码的入口文件 

选择 vscode 调试功能 就可以调试代码



## 服务端和前端的区别

语言是简单的 但是环境是难受的 任何一门语言都可以通过简单学习而掌握 但是环境学习是需要过程的

服务端

 + 服务稳定性
   	+ 服务端接口数据全部都是暴露在互联网之下 可能会遭受各种恶意工具和误操作
      	+ 单个客户端是可以运行意外挂掉 但是服务端是不能【不能因为一个客户端而导致整合服务端的奔溃】
      	+ 【使用 PM2 来做进程守护】
 + 考虑内存和CPU (优化和扩展)
   	+ 客户端独占一个浏览器 cpu 和 内存 运行不是问题
      	+ 服务端要承载大量的请求 cpu 和 内存都是稀缺资源
      	+ 【使用 stream 写日志 使用 redis 存储 session】
 + 日志记录
   	+ 前端会参与写日志 但仅仅只是日志的发起方 不关心后续的逻辑
      	+ 服务端需要记录日志 村粗日志 分析日志 前端不关心
 + 安全
   	+ 服务端需要随时准备接受各种攻击 前端就会少很多 如： 越权 数据库攻击。。。
      	+ 【使用登录验证 预防 xss 工具和 sql 注入】
 + 集群和服务拆分
   	+ 产品发展很快 浏览器可能会迅速增加 通过扩展机器和服务拆分来承接更大流量





## Http 概述

+ node 处理 http 请求
+ 搭建环境
+ 开发接口 【死数据】



**请说出 输入URL 到页面显示的全过程**



## node 如何处理 http 请求

简单处理网络请求 【get】

```javascript
const http = require('http')
const qs = require('qs')

const server = http.createServer((request, response) => {
    console.log('method', request.method)
    const url = request.url
    console.log(url)
    request.query = qs.parse(url.split('?')[1])
    console.log(request.query)
    response.end(JSON.stringify(request.query))
})

server.listen(8888, () => {
    console.log('server is running...')
})
```

简单处理网络请求 【post】

```javascript
const http = require('http')
const qs = require('qs')

const server = http.createServer((request, response) => {
    if (request.method === 'POST') {
        console.log(request.headers)
        let postData = ''
        request.on('data', chunk => {
            console.log(chunk)
            postData += chunk.toString()
        })

        request.on('end', () => {
            console.log(postData)
            response.end('holle world')
        })
    }
})

server.listen(8888, () => {
    console.log('server is running...')
})
```





 ### 搭建开发环境

+ 从0开始 不实用任何框架
+ 使用 nodemon 检测文件变化 自动重启 node
+ 使用 cross-env 设置环境变量 兼容 各大操作系统



安装  **nodemon cross-env** 

Nodemon 保存自动重启 node

cross-env  设置环境变量

```json
"scripts": {
  "develop": " NODE_ENV=develop nodemon ./bin/www.js",
  "prodcution": "cross-env NODE_ENV=prodcution nodemon ./bin/www.js"
},
```



### 搭建路由系统

+ 根据之前的技术方案的设计 做出路由系统
+ 返回假数据 将路由和数
+ 据进行分离 符合设计原则



## 路由 API



## Mysql 【连接数据库】

+  mysql 是企业最常用存储工具 有专人运维
+ mysql 是社区常用的存储工具 有问题随时可以查询



node 中如何连接数据库

安装 mysql 模块

> **yarn add mysql -save**



### 配置

```javascript
const env = process.env.NODE_ENV

let MYSQL_CONFIG

if (env === 'develop') {
    MYSQL_CONFIG = {
        host: 'localhost',
        user: 'root',
        password: '12345678',
        port: '3306',
        database: 'myBlog'
    }
}

if (env === 'production') {
    MYSQL_CONFIG = {
        host: 'localhost',
        user: 'root',
        password: '12345678',
        port: '3306',
        database: 'myBlog'
    }
}

module.exports = {
    MYSQL_CONFIG
}
```



```javascript
const mysql = require('mysql')
const { MYSQL_CONFIG } = require('../config/db')

const connon = mysql.createConnection(MYSQL_CONFIG)

connon.connect()

function exec(sql) {
    return new Promise((resolve, reject) => {
        connon.query(sql, (error, result) => {
            if (error) return reject(error)
            resolve(result)
        })
    })
}

module.exports = { exec }

```



## cookie

+ 什么是 cookie

  + 是存储在浏览器的一段字符串 【浏览器限制 5k】
  + 同源策略的限制 跨域情况下不会共享
  + 格式 k1=v1; k2=v2.... 因此可以结构化的存储数据
  + 在每次的 http 数据请求过程中 都会将该域下【淘宝页面请求百度 就回把百度 cookie 附加到请求头】的 cookie 附加到该请求
  + 服务端可以修改 cookie 并返回值给浏览器

+ Js 是如何操作 cookie 如何查看 【**只能通过 控制台删除 不能通过 代码删除**】

  + > 通过 document.cookie 查看 >>> document.cookie = 'key = value; key = value;' 就会增加

  + 每次数据发送 cookie 都会在请求头中

  + 每次数据的返回都会在返回头中 set-cookie 中查看存储的 cookie

+ server 端操作 cookie实现登录验证



## cookie 如何用于登陆验证

解析 cookie 生成 键值对

```javascript
request.cookie = {}
const cookieStr = request.headers.cookie ?? ''
cookieStr.split(';').forEach(item => {
  const key = item.split('=')[0].trim()
  const value = item.match(/=(\S*)/)[1]
  request.cookie[key] = value
})
console.log('request.cookie', request.cookie)
```



```javascript
if (method === 'POST' && request.path === '/api/user/login') {
  // 判断 cookie 中是否具有 username 字段
  const username = request.cookie['username']
  if (username) {
    return new SuccessModel(request.cookie, '登陆成功')
  }

  new ErrorModel({}, '登陆失败', 500)
}
```



## 服务端如何设置 cookie

服务端设置响应 cookie

```javascript
request.setHeader('Set-Cookie', `username=${username}`)
```

```javascript
request.setHeader('Set-Cookie', `username=${username}; path=/;`)  // 将 cookie 种在根域名下
```

+ 将 cookie 种在根域名下 在相同的域名下的就会使用该 cookie

```javascript
response.setHeader('Set-Cookie', `username=${username}; path=/; httpOnly`)
```

+  设置前端不能 通过 document.cookie 方式获取 cookie
+ 但是前端依旧是可以通过 document.cookie = '设置 cookie 的值' 的方式来添加 cookie 的值【但是设置 key 会有一个默认的空格】

```javascript
const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (1000 * 60 * 60 * 24 * 1)) // 过期时间是 24 小时
    return d.toGMTString() // 设置 cookie 过期标准时间 “Mon, 28 Dec 2020 10:31:16 GMT”
}


const cookie = `username=${username}; path=/; httpOnly; expires=${getCookieExpires()}`
response.setHeader('Set-Cookie', cookie)
```

+  设置 cookie 过期时间





## session

登录中完全使用 cookie 的话是非常危险的 会完全暴露用户相关的信息 即便使用 httpOnly 限制 但是在控制台依旧可以明文获取用户的相关的 cookie 从而伪造信息得到登录的状态和用户的信息



**session 就是解决用户的信息暴露完全的问题**

如何解决：

+ 将客户端 cookie 存放的是用户具体 cookie 的 Id 在服务端存放对应的 cookie 的值 【服务端存储用户具体的信息】【完成信息的传递的依旧是的 cookie】【即便 cookie 暴露情况下依旧无法破解获取具体 cookie 的值】

![image-20201228191118757](/Users/huozhuoyigeliuxiaojian/Library/Application Support/typora-user-images/image-20201228191118757.png)

### 解析 session

```javascript
let needSetCookie = false
let userId = request.cookie.userid
if (userId) {
  if (!SESSION_DATA[userId]) {
    SESSION_DATA[userId] = {}
  }
} else {
  needSetCookie = true
  userId = `${Date.now()}_${Math.random()}`
  SESSION_DATA[userId] = {}
}
request.session = SESSION_DATA[userId]
```

```javascript
if (method === 'POST' && request.path === '/api/user/login') {
  const username = request.cookie['username']
  if (username === 'xiaojianjian') {
    request.session.username = 'xiaojianjian' // 存储 session 值
    return new SuccessModel({ username }, '登陆成功')
  }

  return new ErrorModel({}, '登陆失败', 500)
}
```

```javascript
if (method === 'GET' && request.path === '/api/user/login-test') {
  const username = request.session.username
  if (username) {
    return new SuccessModel(request.session, '登陆成功')
  }
  return new ErrorModel({}, '登陆失败', 500)
}
```



#### sessios 的问题

+ session 目前是 nodejs 内存变量 放在 node 运行的进程中
+ 进程之间内存是有限的 访问量过大 内存暴增怎么办...
+ 正式上线之后运行的是多进程 进程之间是无法共享内存



解决方案:  使用的 **redis**

+ Web serve 最常使用的数据库 数据存放在内存中
+ 相比于 mysql 访问的速度比较快【内存和硬盘不是一个数量级】
+ 但是成本偏高 可以存储数量更小



### 优势

+ webserve 和 redis 数据是拆分成为了多个单独的服务
+ 双方都是独立的 都是可以扩展 【扩展成为集群】



**为什么 session 适合使用 redis**

+ Session 访问极其的频繁 性能的要求极其的高
+ Session 可以不用考虑断电丢失数据的情况
+ Session 数据量都不会太大 【与 mysql 相比】



**网站数据不适合适应 mysql**

+ 操作的频率不是太高
+ 断电不能丢失 必须保留
+ 数据量太大 内存的成本太高



**安装 redis**

+ Mac **brew install redis**

**使用**

```shell
redis-serve # 启动 redis 服务
redis-cli # 连接 redis 只有 服务启动的情况下 才可以继续连接 否则会拒绝连接
set key值 value值 # 设置值
get key值 # 获取所有的值
keys * # 获取所有的值
del kye值 # 删除具体值
```

[配置信息](https://blog.csdn.net/qq_23347459/article/details/104257529)

### node 连接 redis

```javascript
// 配置 redis 数据可连接信息
const redis = require('redis')
const { REDIS_CONFIG } = require('../config/db')

const redisClient = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host)
redisClient.on('error', error => {
    console.log(error)
})

function redis_set(key, value) {
    if (typeof value === 'object') {
        value = JSON.stringify(value)
    }

    redisClient.set(key, value, redis.print)
}


function redis_get(key) {
    return new Promise((resolve, reject) => {
        redisClient.get(key, (error, value) => {
            if (error) return reject(error)
            if (value == null) return resolve(null)

            try {
                resolve(JSON.parse(value))
            } catch (ex) {
                console.error(ex)
                resolve(value)
            }
        })
    })
}

module.exports = { redis_get, redis_set }

```

操作数据存入 redis 数据库

```javascript
let needSetCookie = false
let userId = request.cookie.userid
if (!userId) {
  needSetCookie = true
  userId = `${Date.now()}_${Math.random()}`
  redis_set(userId, {})
}
request.sessionId = userId
redis_get(request.sessionId).then(sessionData => {
  if (sessionData == null) {
    redis_set(request.sessionId, {})
    request.session = {}
  } else {
    request.session = sessionData
  }

  return getPostData(request)
})
```





## 日志

+ 服务端没有日志等价于没有眼睛 --> 抓瞎
+ 第一 访问日志 access log (server 端最重要的日志)
+ 自定义日志 「包括自定义事件 错误」



**为什么日志不存储入mysql 中**

**为何不存入 redis**

**为什么需要存入文件中**



## 文件操作

+ nodeJs 文件操作 nodeJs stream
+ 日志的开发和使用
+ 日志的拆分 日志内容分析



```javascript
const fs = require('fs')
const path = require('path')

const filePath = path.resolve(__dirname, './data.txt')

// 异步方式读取文件
fs.readFile(filePath, (error, data) => {
    if (error) return console.error(error)
    console.log(data.toString())
})

const option = {
    flag: 'a'
}

// 异步方式写如内容
const content = '这是新写如的内容\n'
fs.writeFile(filePath, content, option, error => {
    if (error) return console.error(error)
})

// 异步判断文件是否存在
fs.exists(filePath + 'ss', exist => {
    console.log(exist)
})
```





## IO 限制的解决方案 >> stream 字节数据流边加载边缓存

- Input指从外部读入数据到内存，例如，把文件从磁盘读取到内存，从网络读取数据到内存等等。
- Output指把数据从内存输出到外部，例如，把数据从内存写入到文件，把数据从内存输出到网络等等

IO流以`byte`（字节）为最小单位，因此也称为*字节流*

+ 文件读写 IO
+ 网络传输 IO

换句话讲就是 文件读写也好还是网络传输也好 就是一个特点 就是 "**慢**"

如何在有限的资源下提高 IO 操作效率



在读写文件和网络传输过程中的 因为硬件资源的有限就会遇到性能瓶颈 所以解决方案就是在原有资源的情况下 采用 stream 数据流【字节流】边加载边读写才做 

​	常用在文件的读写 网络资源的加载... 如**视频加载 直播资源**【边加载边缓存 而非一次性就会将数据全部加载完成】 

例子: 在解析 post 数据的传输 body 数据就是采用数据 stream 数据流的方式来处理资源的加载...

```javascript
const getPostData = request => {
    return new Promise((resolve, reject) => {
        const { method, headers } = request
        if (method.toUpperCase() !== 'POST' || headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }

        let postData = ''

        request.on('data', chunk => {
            postData += chunk.toString() // 资源的累计加载 
        })

        request.on('end', () => {
            if (!postData) {
                resolve({})
                return
            }
            resolve(JSON.parse(postData))
        })
    })
}
```



使用 stream 操作服务

```javascript
// 标准输入输出
process.stdion.pipe(proccess.stdout) // 在控制台执行 输入什么就会出什么

const http = require('http')
const server = http.createServer((request, responst) => {
  if(request.method === 'POST') {
    request.pipe(response) // 主要
  }
})

server.listen(8000)
```

```javascript
# 操作文件【复制文件】 stream

const fs = require('fs')
const path = require('path')

const firstFilePath = path.resolve(__dirname, 'data.txt')
const secondFilePath = path.resolve(__dirname, 'data.txt')

const readStream = fs.createReadStream(firstFilePath)
const writeStream = fs.createReadStream(secondFilePath)

readStream.pipe(writeStream)

readStream.on('end', () => {
    console.log('拷贝完成')
})

```

```javascript
# 操作服务 采用 stream

const http = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer((request, response) => {
    const method = request.method
    if (method === 'GET') {
        const filePath = path.resolve(__dirname, 'data.txt')
        const stream = fs.createReadStream(filePath) // 数据就会一点一点流过去的 效率比较高
        stream.pipe(response)
    }
})

server.listen(8000)
```



	### 如何记录项目的日志

在根目录下新建 logs 文件夹 新增 **access.log error.log event.log**

```javascript
// 写日志的方法

const path = require('path')
const fs = require('fs')


function writeLog(writeStream, log) {
    writeStream.write(log + '\n')
}

function createWriteStream(fileName) {
    const fullFileName = path.join(__dirname, '../', '../', 'logs', fileName)
    const result = fs.createWriteStream(fullFileName, {
        flags: 'a'
    })
    return result
}

const accessWriteStream = createWriteStream('access.log')

// 写入访问日志
function access(log) {
    writeLog(accessWriteStream, log)
}

module.exports = { access }
```

在 app 中

```javascript
access(`${method} -- ${url} -- ${headers['user-agent']} -- ${Date.now()}`)
```

日志中内容

```tex
POST -- /api/user/login -- PostmanRuntime/7.26.5 -- 1609248623614
GET -- /api/user/login-test -- PostmanRuntime/7.26.5 -- 1609248628750
GET -- /api/user/login-test -- PostmanRuntime/7.26.5 -- 1609248631335
GET -- /api/user/login-test -- PostmanRuntime/7.26.5 -- 1609248632560
```



### 日志拆分

​	随着日志的数据体量的增加 为了方便日志的分析 都需要对日志的数据进行的拆分

​	可以按照时间划分日志 

​	实现方式 在 linux 有 crontab 命令 及定时任务



Linux 设置的定时任务的命令

```shell
	# 设置定时任务 格式
	# * 第一个星代表分钟 如果写 *  就是忽略分钟 就是不管 写具体数据就是等到每天多少分种过后执行命令
  # * 第二个星代表小时 如果写 *  就是忽略小时 就是不管 写具体数据就是等到每天多少小时过后执行命令
	# * 第三个星代表日期 如果写 *  就是忽略日期 就是不管 写具体数据就是等到多少日期过后执行命令
	# * 第四个星代表月份 如果写 *  就是忽略月份 就是不管 写具体数据就是等到多少月份过后执行命令
	# * 第五个星代表星期 如果写 *  就是忽略星期 就是不管 写具体数据就是等到多少星期过后执行命令

	***** command
```

将 access.log 拷贝并重命名为 0000-00-00.access.log 清空 access.log 文件 继续累积日志



新建 copy.sh 脚本命令

```shell
#!/bin/sh
cd /Users/huozhuoyigeliuxiaojian/Desktop/nodeJs/blog # 进入制定目录
cp access.log $(date +%Y-%m-%d).assess.log # 拷贝文件并且重命名
echo "" > access.log # 清空文件
```

执行脚本 sh copy

执行定时任务 **crontab -e** 进入执行环境 输入命令执行定时环境 

```shell
* 0 * * * sh /Users/huozhuoyigeliuxiaojian/Desktop/nodeJs/blog/utils.copy.sh # 执行执行目录下的脚本文件
crontab -l # 查看定时任务
```



### 分析日志

分析可以分析接口的请求次数 浏览器占比...

+ 日志是按行读取的 一行就是一个日志
+ 使用 nodeJs deadline 【基于 stream 效率较高】



## 服务端 安全

### 硬件层面的攻击 -- 需要硬件和服务器来支持 【op 支持】 DDOS

### sql 脚本注入【输入 sql 片段 最终拼接成为一段攻击代码】

```sql
INSERT INTO `users` VALUES (1, 'xiaojianjian', 'if(mm==\"r11@\"){}', '小贱贱');
```

在前端文本输入框中 填写用户的时候加入 **xiaojianjian --** 在后端进行数据拼接成完整字符在数据库服务器中就会看成

```sql
INSERT INTO `users` VALUES (1, 'xiaojianjian --', 'if(mm==\"r11@\"){}', '小贱贱');
```

**-- 后面的内容就会被认为是注释的内容 从而只判断到一个字段** 这样的数据返回就会查询到指定的数据 而在前端就会认为是有数据而认为是登录成功

#### 解决方案

在 mysql 第三方模块包中 有一个方法可以 **escape** 处理 sql 语句的输入



### Xss 脚本工具

前端负责 40% 后端需要负责 60%

攻击的方式主要是在元素中加入掺杂 JavaScript 代码 以获取网页用户信息 【cookie storge】

防范措施: 转译 Js 中特殊的字符 限制输入的长度等...



### 密码非对称加密存入数据库

可以使用第三方的加密模块 md5 。。。。 将关键数据加密后存储



## Express

### 安装 【express-generator】

```shell 
yarn add express-generator -g
```

+ 插件集成使用
+ 插件实现原理



[mysql 下载地址](https://dev.mysql.com/downloads/mysql/) 

[node API 文档](http://nodejs.cn/api/)