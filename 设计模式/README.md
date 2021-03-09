# 面向对象设计



## 什么是面向对象的方式

+ 将客观的对象抽象成为属性和对属性相关操作， 将内部细节和不相关的信息隐藏起来
+ 将同一个类型的客观对象属性数据和操作绑定在一起 封装成为类
+ 允许分成不同层次进行抽象 通过集继承实现属性和操作的共享
  + 面向对的事分析 OOA
  + 面向对象的设计 OOD
  + 面向对象的编程 OOP



## 相关概念

+ 类:  是同类事物的总称

```javascript
class Animal {
    constructor(name) {
        this.name = name
    }

    eat(food) {
        console.log(`${this.name} 吃 ${food}`)
    }
}

let dog = new Animal('狗')
dog.eat('屎')
```



+ 对象: 实例对象的产物

+ 类的继承

```javascript
class Animal {
    constructor(name) {
        this.name = name
    }

    eat(food) {
        console.log(`${this.name} 吃 ${food}`)
    }
}

class Dog extends Animal {
    constructor() {
        super('狗')
    }

    speak() {
        console.log('汪汪')
    }
}

let dog = new Dog()
dog.eat('屎')
```

+ 三大特性

  + 封装

    + 将数据进行封装
    + 减少耦合 不该外部访问的就绝对不要外部进行访问
    + 利于数据接口和权限管理
    + ES6 目前不支持 一般认为 "_" 开头的属性都是私有的 不要使用
    + 修饰符
      + public 共有属性 可以在类内或者内外使用 public 修饰的属性或者行为 【默认的修饰符】
      + Protected 受保护的修饰符 可以在本类和子类中国使用 protected 修饰的属性和行为
      + Private  私有修饰符 只可以在类内使用 修饰符的属性和行为

  + 继承

  + 多态

    + 同一个接口的不同的实现
    + 保持子类的开放性和灵活性
    + 面向接口编程
  
+ 设计原则

  + 何为设计: 
    + 按照制定思路或者标准来实现功能
    + 功能相同 可以具有不同设计的方式
    + 需求如果不断变化 设计作用才能得到具体的实现
  + 设计的原则
    + **单一职责原则**: 认为对象仅仅具有单一功能的概念
      + 一个程序只能做一件事
      + 功能特别的负责就对过程进行拆分 【大道至简 从小事做起】
    + **开放封闭原则**: 对扩展开放 对内部的实现进行封闭
      + **对扩展开放 对内部的修改关闭**
      + 增加需求时 扩展新代码 不是去修改已经有的代码
    + 里氏替换原则: 程序中的对象应该是可以在不改变程序正确的前提下被其他的子类所替换概念
      + 子类可以覆盖父类
      + 父类出现的地方 子类也能出现
    + 接口隔离原则: 多个特定客户端接口要好于一个宽泛用途的接口
      + 保持接口单一独立 避免出现胖接口
    + 依赖反转原则: 依赖于抽象而不是一个实例
      + 面向接口编程 依赖于抽象而不是具体实现
      + 使用方只需要关注接口而不关注具体实现的类



## 23 种设计模式

+ UML: 统一的建模语言
  + 类图: 用于描述系统中对象类本身组成和对象之间的静态关系
  + 类与类之间的关系：**依赖**，**范化【继承】**,**实现**,**关联**,**聚合**,**组合**
    + 依赖: 在类中如果用到对方 两者之间的就是依赖的关系 如果不是两者之间连编译通过都会存在问题
      + 箭头类型 **空心三角** 【类似于大于小宇符号】
    + 泛化: 实际就是继承关系
      + 箭头类型：**空心三角形箭头**
    + 实现关系





### 1. 工厂模式

​	将 new 操作单独进行封装 在项目中如何 遭遇 new 关键字 就应该使用 工厂模式 进行封装

+ 简单工厂实现方式 
  + 一个构造函数或者一个具体的类如果直接实例话 耦合性较好 并且依赖于具体实现方式 这时就可以采用工厂模式将具体实例方式封装 将方法暴露给外部 【对修改关闭 对扩展开放】

```javascript
class Plant {
    constructor(name) {
       this.name = name
    }

    grow() {
        console.log(`${this.name} 正在生长`)
    }
}

class Apple extends Plant {
    constructor(flavour) {
        super('苹果')
        this.flavour = flavour
    }
}

class Orange extends Plant {
    constructor(flavour) {
        super('橘子')
        this.flavour = flavour
    }
}

/**
 * 当以上的类写好之后 不要直接实例 代码之间的耦合性极高 并且依赖于具体的实现方式
 * 使用简单工厂模式创建实例
 */

class Factory {
    constructor() {
        this.plantType = {
            apple: function (flavour) {
                return new Apple(flavour)
            },
            orange: function(flavour) {
                return new Apple(flavour)
            }
        }
    }

    create(type, flavour) {
      	try {
          return this.plantType[type](flavour)
        } catch(error => {
         	throw new Error('没有你想要的') 
    		})
        
    }
}

const factory = new Factory()
console.log(factory.create('apple', '甜甜的'))
```

经典场景

+ JQuery

```javascript
class JQuery {
  // 此处省略若干行
}

var $ = function(selector) {
  return new JQuery(selector)
}
```

+ React

```javascript
class VVNode {
  constructor(tagName, attrs, children) {
    this.tagName = tagName
    this.attrs = attrs
    this.children = children
  }
  
  。。。
}

function createElement(tagName, attrs, children) {
  return new VVNode(tagName, attrs, children)
}
```

+ 工厂方法

  + 在工厂方法模式中 核心的工厂类不咋负责多有的产品创建 而是将具体创建的工厂做交给子类
  + **核心精髓 每一个产品都有一个对应的工厂方法**

  Method.js

  ```javascript
  class Plant {
      constructor(name) {
          this.name = name
      }
  }
  
  module.exports = Plant
  ```

  Factory.js

  ```javascript
  class Flctory {
      create() {}
  }
  
  module.exports = Flctory
  ```
	apple.js
  ```javascript
  const Plant = require('./method')
  const Factory = require('./factory')
  
  class Apple extends Plant {
      constructor(flavour) {
          super('苹果')
          this.flavour = flavour
      }
  }
  
  class AppleFactory extends Factory {
      static create() {
          return new Apple('甜甜的')
      }
  }
  
  module.exports = AppleFactory
  
  ```

	index.js
  ```javascript
  const AppleFactory =  require('./apple')
  const OrangeFactory =  require('./orange')
  
  class CreatePlant {
      constructor() {
          this.plantType = {
              'apple': function() {
                  return AppleFactory.create()
              },
              'orange': function() {
                  return OrangeFactory.create()
              }
          }
      }
  
      create(type) {
          return this.plantType[type]()
      }
  }
  
  const apple = new CreatePlant().create('apple')
  console.log(apple)
  
  
  // 后期可以通过 json 配置文件进行单独的配置
  ```
  
  

## 2. 单列模式

一个构造函数或者一个类仅仅只有一个实例 【不管实例化多少次 都只有一个唯一的实例】

设计模式思想是由 java 发起 在前端 js 中是没有 java 中那样完美 在前端是无法避免 创建实例方法 【因为创建单列是通过新增一个方法实现 在声明的 时候如果没有特殊说明是无法知道创建实例方法 可能直接就 实例了】

```javascript
class Window {
    constructor(name) {
        this.name = name
    }

    static getInstance() {
        if(!this.instance) {
            this.instance = new Window()
        }
        return this.instance
    }
}

// 这里得到的就是一个唯一的实例
let w1 = Window.getInstance()
let w2 = Window.getInstance()
```

+ 以上代码存在的问题
  + 客户端【调用者】必须知道这是一个单列的类【构造含函数】必须注定调用制定方法
  + 并不能够真正的阻止客户端直接 new 类【构造函数】

### 透明单列模式

```javascript
let Window = (function() {
    // this = window
    let window
    return function(name) {
        if(window) {
            return window
        } else {
            this.name = name
            return (window = this)
        }
    }
})()

const w1 = new Window()
const w2 = new Window()

// 以上代码违反单一职责
```

代码优化

```javascript
function Window(name) {
    this.name = name
}

Window.prototype.getName = function() {
    console.log(this.name)
}

let CreateSingle = (function() {
    let instance // js 中只能使用单列模式进行限制
    return function(name) {
        if(!instance) {
            instance = new Window(name)
        }
        return instance
    }
})()

let w1 = new CreateSingle('xiao')
let w1 = new CreateSingle('jian')
```

经典实用场景

+ JQuery

+ 登录框
+ 购物车
+ Vuex redux
+ 。。。。





## 3. 适配器模式

旧接口和使用者不兼容 中两者之间增加适配器进行转换

如何 不同国家的电压或者 插座的转换。。。

```javascript
class Adaptee {
    specificRequeat() {
        return '德国标准插头'
    }
}

class Target {
    constructor() {
        this.adaptee = new Adaptee()
    }

    request() {
        let info = this.adaptee.specificRequeat()
        return `${info} -> 转换器 -> 中国标准插头`
    }
}

let target = new Target()
let result = target.request()
console.log(result)
```

经典实用场景

+ 之间的就接口的封装

```javascript
function ajax(options) {
    const defaultOptions = {
        method: 'GET',
        dataType: 'json'
    }

    for (const attr in options) {
        defaultOptions[attr] = options[attr] ?? defaultOptions[attr]
    }

    console.log(defaultOptions)
}

ajax({
    url: 'http://www.baidu.com',
    method: 'POST'
})
```

+ vue computed 计算属性 【data 中的数据如果不能够之间展示 可以在 vue computed 中进行转换然后展示】

```javascript
const fs = require('fs')

function promisify(fn) {
    return function (...args) {
        return new Promise((resolve, reject) => {
            fn(...args, (error, data) => {
                error ? reject(error) : resolve(data)
            })
        })
    }
}

let readFile = promisify(fs.readFile)

(async function read() {
    let one = await readFile('1.txt', 'utf8')
    let two = await readFile('2.txt', 'utf8')
    let three = await readFile('3.txt', 'utf8')
    console.log(one, two, three)
})()
```

在实际项目的过程中 我们在维护项目的时候 如果之前的项目的某个方式实现存在问题 那么 我们就可以通过。适配器的模式进行改善 而不妖直接更改之前的功能正常的代码



## 装饰器模式

为了给对象添加新的功能 不能改变其原有的结构以及功能 【相比于继承 更加的强大】

执行顺序：从下至上 从右至左

场景： 手机壳 【装饰作用 不改变本身的功能和方法】

代码示例

```javascript
class Circle {
    draw() {
        console.log('画一个图形')
    }
}

class Decorator {
    constructor(circle) {
        this.circle = circle
    }

    draw() {
        this.circle.draw()
        this.setRedBorder()
    }

    setRedBorder() {
        console.log('设置红色边框')
    }
}

let circle = new Circle()
circle.draw()

let dec = new Decorator(circle)
dec.draw()
```

代码场景：ES7 之后的装饰场景

需要在 node 项目中 babel 配置相中配置 转换插件 【java 中装饰器的写法在 js 不是一个写法】

Babel-plugin-transform-decorators-legacy

```javascript
@testDec
class Demo {
    // ...
}

// target 就是类本身
// 如果有的方法不是以静态方式方式添加的话 可以使用类的原型 target.prototype
function testDec(target) {
    target.isDec = true
}

//  Demo = testDec(Demo) ?? Demo

alert(Demo.isDec)
```

装饰器可以装饰类和装饰方法

装饰器方法也可以在内部进行传参数

```javascript
function testDec(isDec) {
    return function(target) {
        target.isDec = isDec
    }
}

@testDec(true)
class Demo {
    // ...
}

alert(Demo.isDec)
```



代码示例

```java
function mixins(...list) {
    return function(target) {
        Object.assign(target.prototype, ...list)
    }
}

const Foo = {
    foo() {
        alert('foo')
    }
}

@mixins(Foo)
class MyClass {}

let obj = new MyClass()
obj.foo()
```

装饰方法

```javascript
// target 就是类本身 name 方法名 descriptor 属性描述
/*
	{
		value: specifiedFunction, // 值性只
		enumerbale: false, // 是否可以枚举
		configurable: true, // 是否可配置
		writable: true // 是否可写
	}
*/
function readonly(target, name, descriptor) {
  descriptor.writable = false // 禁止写操作
  return descriptor
}

function log(target, name, descriptor) {
    let oldValue = descriptor.value
    descriptor.value = function () {
        console.log(`calling ${name} width`, arguments)
        return oldValue.apply(this, arguments)
    }
    return descriptor
}


class Person {
  constructor() {
    this.first = 'A'
    this.last = 'A'
  }
  
  @readonly
  @log
  name() {
    return `${this.first} ${this.last}`
  }
}
```

**Core-decorators** 装饰器库

安装 yarn add core-decorators 库文件

[core-decorators](https://github.com/jayphelps/core-decorators)





## 代理模式

使用者无权访问木目标对象 中间加上代理 通过代理做授权访问 【中介作用】 【科学上网工具】

演示 【简单代理】

```javascript
class ReadImg {
    constructor(fileName) {
        this.fileName = fileName
        this.loadFromDisk()
    }

    loadFromDisk() {
        console.log('display...' + this.fileName)
    }

    display() {
        console.log('display...' + this.fileName)
    }
}

class ProxyImg {
    constructor(fileName) {
        this.readImg = new ReadImg(fileName)
    }

    display() {
        this.readImg.display()
    }
}

const proxyImg = new ProxyImg('1.png')
console.log(proxyImg.display())
```

**代理缓存**

```javascript
let sum = (function() {
    let cache = Object.create(null)

    function multi(n) {
        return (n<1) ? 1 : n * (cache[n-1] ?? multi(n-1) )
    }

    return function (n) {
        let result = 0
        for (let i = 1; i <= n; i++) {
            let res = 0
            res += multi(i)
            cache[i] = res
            result += res
        }
        cache = null
        return result
    }
})()


console.log(sum(10))
```

**代理模式和适配器模式特点**

+ 适配器模式提供的是一个不同的接口 API 方法
+ 代理模式提供的是一模一样的方法 现实原有功能 但是经过限制和阉割
+ 装饰器模式扩展功能 与原有功能不变可以直接使用





## 外观模式

为子系统提供一个高层的数据接口

示例: 看病【挂号 门诊 划价 】都有接待员

多个类进行统一封装 向外提供一个统一的接口数据

**组成**

+ 门面角色： 外观模式的核心 因为他是被客户调用 他熟悉子系统的功能
+ 子系统角色: 实现子系统的功能 对于客户端角色和门面角色是未知
+ 客户角色: 通过调用 Facede 来完成功能实现

```javascript
function bindEvent(element, type, selector, fn) {
    if(fn == null) {
        fn = selector
        selector = null
    }
    // ********
}

bindEvent(ele, 'click', '#div1', fn)
bindEvent(ele, 'click', fn)
```





# 观察者模式 【重中之重】

+ 发布 & 订阅
+ 一对一 或者一对多



+ 被观察者提供观察者一系列的方法
+ 观察者提供更新接口
+ 观察者将自己注册到被观察者中
+ 在被观察者发生改变的时候 调用观察者的更新方法

```javascript
// 声明被观察者
class Subject {
    constructor() {
        this.state = 0
        this.observers = []
    }

    getState() {
        return this.state
    }

    setState(state) {
        this.state = state
        this.notifyAllObservers()
    }

    notifyAllObservers() {
        this.observers.forEach(observer => {
            observer.update()
        })
    }

    attach(observer) {
        this.observers.push(observer)
    }
}

// 声明观察者
class Observer {
    constructor(name, subject) {
        this.name = name
        this.subject = subject
        this.subject.attach(this)
    }

    update() {
        console.log(`${this.name} update, state: ${this.subject.getState()}`)
    }
}

// test
let s = new Subject()
let o1 = new Observer('xiao', s)
let o2 = new Observer('jian', s)
let o3 = new Observer('jian', s)

s.setState(1)
```

+ 场景

  + 网页事件绑定

    ```javascript
    // 被观察者 函数题观察者
    $('#btn1').click(function() {
      console.log(1)
    })
    ```

  + Promise

    ```javascript
    function loadImg(src) {
        return new Promise((resolve, reject) => {
            const img = document.createElement('img')
            img.onload = function () {
                resolve(img)
            }
            img.onerror = function () {
                reject('图片家在失败')
            }
            img.src = src
        })
    }
    
    const result = loadImg('http://www.baidu.com/images/index.png')
    result.then(img => {
        console.log(img.width)
        return img
    }).then(img => {
        console.log(img.height)
    })
    ```

    

  + JQuery Callback

  + nodeJs 自定义事件

  



场景

+ 网页事件代理 

  ```javascript
  const div1 = document.getElementById('div1')
  div1.addEventListener('click', function (e) {
    const target = e.target
    if(target.nodeName === 'A') {
      alert(target.innerHTML)
    }
  })
  ```

+ JQuery $.proxy

  ```javascript
  $('#div1').click(function() {
    const fn = function() {
      $(this).css('background-color', 'red')
    }
    fn = $.proxy(fn, this)
    setTimeout(fn, this)
  })
  ```

+ ES6 Proxy





## 迭代器模式

顺序访问一个集合 【指数组】根据索引值处理

使用者无需知道集合封装



## 状态模式

+ 当一个状态放生改变的时候 就会导致起内部的行为发生改变 就如同是改变对象

+ 对象有自己的状态
+ 不同的状态执行的逻辑就会不一样
+ 明确状态和每个状态下执行的动作
+ 用来减少 if else 语句



案例: 

​	手机电量。不同的电量显示的颜色就会不同 【电量就是状态】

```javascript
class SuccessState {
    show() {
        console.log('显示绿色')
    }
}

class WarningState {
    show() {
        console.log('显示黄色')
    }
}
class ErrorState {
    show() {
        console.log('显示红色')
    }
}


class Battery {
    constructor() {
        this.amount = 'high'
        this.state = new SuccessState()
    }

    show() {
        // 将现实的逻辑委托给了状态对象
        // 内部还需要维护状态的变化
        this.state.show()

        if(this.amount === 'high') {
            this.amount = 'middle'
            this.state = new WarningState()
        } else if(this.amount === 'middle') {
            this.amount = 'low'
            this.state = new ErrorState()
        }
    }
}

const battery = new Battery()
battery.show()
battery.show()
battery.show()
```

 

红绿灯切换

```javascript
class State {
    constructor(color) {
        this.color = color
    }

    handle(context) {
        console.log(`turn to ${this.color} light`)
    }
}

class Context {
    constructor() {
        this.state = null
    }
    setState(state) {
        this.state = state
    }

    getState() {
        return this.state
    }
}

let context = new Context()

let green = new State('green')
let yellow = new State('yellow')
let red = new State('red')

// 亮绿灯
green.handle(context)
```



场景:

+ 有限状态机: 有限的状态 并且在这些个状态之间进行切换
  + 交通信号灯
  + 手机电池电量
  + 使用开源库文件 【[[javascript-state-machine)](https://github.com/jakesgordon/javascript-state-machine)】
+ promise



## 策略模式

将定义的一组算法进行封装 使其之间可以被相互的替换 封装的算法具有一定的独立性 不会随着客户端的变化的而发生变化

可以用于避免if else if 或者 switch case 语句

超市会员

```javascript
// 这是没有使用设计模式的情况
class Customer {
    constructor(type) {
        this.type = type
    }

    pay(amount) {
        if(this.type === 'member') {
            return amount * .9
        } else if(this.type === 'vip') {
            return amount * .8
        } else {
            return amount
        }
    }
}
```



```javascript
// 这是使用策略模式的情况
// 但是这种设计模式具有缺陷
class Customer {
    constructor(kind) {
        this.kind = kind
    }

    pay(amount) {
        return this.kind.pay(amount)
    }
}
class Normal {
    pay(amount) {
        return amount
    }
}
class Member {
    pay(amount) {
        return amount * .9
    }
}
class VIP {
    pay(amount) {
        return amount * .8
    }
}

new Customer(new VIP())
```



优化后的代码

```javascript
class Normal {
    static pay(amount) {
        return amount
    }
}

class Member {
    static pay(amount) {
        return amount * .9
    }
}

class VIP {
    static pay(amount) {
        return amount * .8
    }
}

class Customer {
    constructor() {
        this.customerType = {
            member: amount => Member.pay(amount),
            vip: amount => VIP.pay(amount),
            normal: amount => Normal.pay(amount)
        }
    }

    pay(kind, amount) {
        try {
            return this.customerType[kind](amount)
        }catch (e) {
            console.log(e.message)
        }
    }
}

const customer = new Customer()
console.log(customer.pay('vip', 1000))

```

从以上的代码中可以看出 没有的 if else 语句的存在 增加了代码的节藕性



## 原型模式

不同类上的方法可以进行复用【主要是方法】 减少内存损耗 克隆自己从而生成一个新的对象

创建基类的时候 简单差异属性放置在构造函数的内部 消耗资源的放置在基类的原型中

在 js 中就是构造函数 原型 实例之间的关系



## 桥接模式

将抽象的部分和其他实现的部分相分离 这样抽象化的实现节藕 使其独立化

实现场景是实现系统多个角度分析 每一种角度都可能会发生变化

桥方可以实现桥接口进行单方面的扩展 在另一方面可以继承抽象类而单方面扩展 之间的调用就是桥接口来作为突破口 不会受到双方扩展的影响



## 迭代器模式

顺序访问一个集合

使用者无需知道其内部结构





代码示例 

+ 单一职责 封闭原则

  ```javascript
  <!doctype html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport"
            content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Document</title>
  </head>
  <body>
      <div>
          <form id="useForm" action="">
            	// 之后添加对应的文本矿只需要添加对应方法
              <input data-validate="checkUsername" type="text" name="username" id="username">
              <input data-validate="checkEmail"type="text" name="email" id="email">
              <button onclick="newCheck()" type="button">提交</button>
          </form>
      </div>
  
      <script>
          // 传统写法
          // 不要修改原来的方法 具有一定层次上的风险
          function check() {
              let username = document.querySelector('#username').value
              if(!username || username.length < 6 || username.length >12) {
                  return window.alert('用户名不合法')
              }
  
              let email = document.querySelector('#email').value
              if(!email || email.length < 6 || email.length >12) {
                  return window.alert('邮箱不合法')
              }
          }
  
  				// 现在写法 只需扩展对应文本框的方法即可 对于 newCheck 方法中的内容不更改
          function newCheck() {
              const formElement = window.document.querySelector('#useForm')
              const inputList = formElement.querySelectorAll('input')
              for (let index = 0; index < inputList.length; index++) {
                  let validate = inputList[index].dataset['validate']
                  let vaildataFn = window[validate]
                  if(vaildataFn) {
                      const error = vaildataFn(inputList[index])
                      return error && window.alert(error)
                  }
              }
          }
  
          function checkUsername(input) {
              console.log(input)
              return '用户名不合法'
          }
      </script>
  </body>
  </html>
  
  ```

