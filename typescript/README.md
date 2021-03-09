Typescript 重构 axios

## 需求分析

+ 在浏览器端使用 **XMLHttpRequest** 对象通讯
+ 支持 promise API
+ 支持请求和响应拦截器
+ 支持请求数据的转换
+ 支持请求的取消
+ JSON 数据自动转化
+ 客户端防止 XSRF



## 项目初始化

### 新建代码仓库



### 初始化项目脚手架工具 Typescript library starter



使用方式

```powershell
git clone git@github.com:alexjoverm/typescript-library-starter.git ts-axios
cd ts-axios
```



### 编写基础的请求代码





![image-20201029062656827](/Users/xiaojianjian/Library/Application Support/typora-user-images/image-20201029062656827.png)



![image-20201029062746002](/Users/xiaojianjian/Library/Application Support/typora-user-images/image-20201029062746002.png)

![image-20201029062809777](/Users/xiaojianjian/Library/Application Support/typora-user-images/image-20201029062809777.png)

## ts-axios 基础功能实现

### 处理 url 参数

#### 需求分析

##### 处理参数为数组

```javascript
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: ['bar', 'baz']
  }
})
```

/base/get/?foo[]=bar&foo[]=baz

##### 处理参数为对象 

```javascript
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: {
      bar: 'baz'
    }
  }
})
```

/base/get?foo={"bar": "bar"}



##### 处理参数为 Date 类型

```javascript
const date = new Date()

axios({
  method: 'get',
  url: '/base/get',
  params: {
    date
  }
})
```

/base/get?date=2020-10-29T05:55:39.0302



##### 处理特殊字符

@ : $   [ ]

以上字符包括 空格 不希望被encode

##### 空值忽略

值为 null  或者 值为 unfined 不添加相应属性和属性值



##### 丢弃 hase 标志

##### 保留已有参数



#### buildUrl 实现

![image-20201029071557041](/Users/xiaojianjian/Library/Application Support/typora-user-images/image-20201029071557041.png)

![image-20201029071623270](/Users/xiaojianjian/Library/Application Support/typora-user-images/image-20201029071623270.png)

![image-20201029071642949](/Users/xiaojianjian/Library/Application Support/typora-user-images/image-20201029071642949.png)

![image-20201029071757305](/Users/xiaojianjian/Library/Application Support/typora-user-images/image-20201029071757305.png)

 开发 buildUrl 方法