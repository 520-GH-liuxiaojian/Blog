## Typescript 教程

 

开发工具推荐使用 VS code 微软做了很多代码的适配 可以加快项目的开发速度



### 什么是Typescript

是 JavaScript 超集 具有类型的属性 必须编译过后才能被执行

```javascript
// js 是动态类型
let a = 123
a = '123'
```

```typescript
// 静态类型
let b = 123
b = '123' // 报错 在声明变量的时候就已经确定了变量的类型 后期不能够更改

let c:number = 123
```





### Typescript 带来的优势

原生的 js

```javascript
function demo(data) {
  return Math.sqre(data.x ** 2 + data.y ** 2)
}

demo({x: 12, y: 24})
```



现在的 ts

```typescript
function demo(data: { x: number, y:number }) {
  return Math.sqre(data.x ** 2 + data.y ** 2)
}

demo({x: 12, y: 24}) // 不按照规则就会提示报错
```

+ 开发过程中可以发现潜在的问题
+ 更友好的代码提示
+ 代码语义化更清晰



### 开发环境搭建

```shell
yarn add typescript -g

// 编译文件
tsc 文件名和路径
```

每次编译都需要手动 可以安装 **ts-node**

```javascript
ts-node 文件
```



### 静态类型的深入理解

+ 声明了变量之后 变量默认方法和属性会有相关的提示
+ 声明接口之后 接口的属性和方法就会被提示



## 基础类型和对象类型

+ 基础类型 number string boolean null undefined sysbol void

+ 对象类型 object  [] class 函数 Date

  ```typescript
  const getTotal: () => number = () => {
    return 123
  }
  ```

  

## 类型注解和类型推断

+ 类型注解: 类型在声明的时候就声明是什么类型

  ```typescript
  let count: number
  count = 123
  ```

+ 类型推断: 类型可以自动推断出数据类型

  ```typescript
  let number = 123 => 自动推断出是 number
  ```

在需要的时候必须加上 **类型**

+ 多个类型情况

```typescript
let temp: number | string = 123 // 可以是 数字也可以是字符
```





## 函数相相关的类型

```typescript
function add(first: number, second: number): number { // 返回值是 number
  return first + second
}

function sayHello(): void { // 没有返回值
  console.log('hello')
}

function sayHello(): never { // 不可能执行到最后
  throw new Error()
  console.log(123)
}

function sayHello({first, second}: { first: number, second: number }) {
  return first + second
}

const total = add(1, 2)
```





## 数组和元组

#### 数组声明

```typescript
const number = [1,2,3]
```

单一数据类型数组

```typescript
const numberArr:number[] = [1,2,3]
const undefinedArr: nudefined[] = [undefined]
```

多个数据类型数组

```typescript
const arr: (number | string)[] = [1, '2', 3]
```

数组内是对象的情况

```typescript
const objectArr: {name: string,age: number}[] = [
  {name: 'xiaojianjian', age: 18},
  {name: 'xiaojianjian', age: 18},
]
```

以上的写法不一定看的懂

可以通过**类型别名**

```typescript
type User = {name: string, age: number}

const objectArr: User[] = [
  {name: 'xiaojianjian', age: 18},
  {name: 'xiaojianjian', age: 18}
]
```



#### 元组声明

**元组**: 约束数组单个项的数据类型

```typescript
const teacherInfo: [string, string, number] = ['liu', 'xiaojian', 12] // 单维

const teacherList: [string, string, number][] = [ // 多维
  ['liu', 'xiaojian', 12],
  ['liu', 'xiaojian', 12],
  ['liu', 'xiaojian', 12]
]
```



## interface 接口 【通用的类型集合】

```typescript
const getPersonName = person => {
    console.log(person.name)
}

const setPersonName = (person, name) => {
    person.name = name
}
```

以上的代码虽然是 ts 文件 但是没有用到 ts 如果传递的值是 undefined 类型 这个应用程序就会报错 所以为了让传递的值具有 name 属性 就必须要加上属性限制



```typescript
const getPersonName = (person: { name: string }) => {
    console.log(person.name)
}

const setPersonName = (person: {name: string}, name: string) => {
    person.name = name
}
```

以上的代码出现重复属性 **{name: string}** 所以可以通过接口限定的方式避免重复属性出现

```typescript
// 通用的类型集合就可以使用 inteface 表示
interface Person {
    name: string,
    age?: number, // 可有可无
    readonly sex: string, // 只读 不可写
    [propName: string], any, // 未来可以有其他的类型 属性是 string 值是 any
    sayHello(): string, // 方式 返回值是 string
}

const getPersonName = (person: Person) => {
    console.log(person.name)
}

const setPersonName = (person: Person, name: string) => {
    person.name = name
}
```

> **当已字面量的方式进行数据的传递时候 ts 做的是强制校验**



### 类应用接口

Ts 中是有类的概念 是可以应用接口 

```typescript
class User implements Person {
    name = 'xiaojianjan'
    sex = '男'
    sayHello() {
        return this.name
    }
}

```



## interface 可以相互继承

```typescript
interface teacher extends Person {
  teach(): number 
}
```



### interface 可以定义函数声明

```typescript
interface SayHi {
  (word: string): string
}

const say: SayHi = (word: string) => {
  return word
}
```



## interface 和 type 的区别

```typescript
interface Person {
    name: string
}

type PersonOne {
	name: string
}

const getPersonName = (person: Person) => {
    console.log(person.name)
}

const setPersonName = (person: PersonOne, name: string) => {
    person.name = name
}
```

+ type 可以直接表示 类型 interface 只能表示 对象



>  **ts 中 能用 interface 就不要用 type** 编译成为 js 所有类型相关的东西都会被剔除掉





## 类 与 继承

类的定义: 具有相同属性和事件的统称

```typescript
class Person {
    name: string = 'dell'
    getName(): string {
        return this.name
    }
}
```

继承

```typescript
class Person {
    name: string = 'dell'
    getName(): string {
        return this.name
    }
}

class Teacher extends Person { // 不但可以继承属性还可以继承方法
    teachTime(): number {
        return Math.random() * 10
    }
}

const teacher = new Teacher()
teacher.teachTime()
```

重写

```typescript
class Person {
    name: string = 'dell'
    getName(): string {
        return this.name
    }
}

class Teacher extends Person {
    getName(): string { // 子类可以重写父类方法
        return this.name
    }
}

const teacher = new Teacher()
teacher.getName()

// 可以通过 super 关键字调用父类的方法
class Father extends Person {
  getName():string {
    return `${super.getName()} xiaojianjian`
  }
}

```



### 类中的访问类型和构造器

 Private public protected

>  在属性和方法面前如果没有使用 修饰符 默认的就是 **public**

+ public 允许在类内和类外被使用
+ Private 允许在类的内部使用
+ protected 允许在类的内部和继承子类中使用





**constructor**

new 的瞬间就会被执行

```typescript
// 传统写法
class Person {
    public name: string
    constructor(name: string) {
        this.name = name
    }
}

 // 等价于

// 简化写法
class Person {
    constructor(public name: string) {}
}
```



```typescript
class Person {
    constructor(public name: string) {}
}

// 可以继承父类简化写法属性
class Teacher extends Person {
    constructor(public age: number) {
        super('xiaojianjian')
    }
}
new Teacher(28)

```





## 静态属性 setter getter【本身是属性不是方法】

项目中需求出现属性值不能直接被外部得到的方式 就可以通过处理之后的手段让用户得到

Getter 用来获取属性处理之后的属性 

setter 设置类上属性的属性值

```typescript
class Person {
    constructor(private _name: string) {}

    get getName() {
        return this._name
    }

    set setName(name: string) {
        this._name = name
    }
}

const person = new Person('xiaojianjian')
person.getName
person.setName = '你好鸭'
```



+ 静态属性 【将方法或者属性直接挂载到类上】

```typescript
class Person {
		static getIntstnce() {
      
    }
}

Person.getIntstnce() // 直接就可以通过类点出上面静态方法
```

+  只读属性

```typescript
class Person {
    public readonly name: string
    constructor(name: string) {
        this.name = name
    }
}

const person = new Person('xiaojianjian')
person.name = 'xiaojianjian' // 赋值一场 设置只读 不可写
```



通过静态模式创建**单列模式**

```typescript
class Person {
    private constructor() {}
    private static instance: Person

    public static getInstance() {
        if(!this.instance) {
             this.instance = new Person()
        }
        return this.instance
    }
}

const person1 = Person.getInstance()
const person2 = Person.getInstance()
```



**抽象类** 将类型重复的方法和属性统一集合

+ 抽象类不可实例只能被继承
+ 抽象方法不能实现只能被定义
+ 抽象类的内部也可以写上具体的方法和属性

```typescript
abstract class Gemo {
    abstract getArea(): number
    width: number
}

class Cirtcle extends Gemo {
    getArea() {
        return 123
    }
}

class Square extends Gemo {
    getArea() {
        return 123
    }
}

class Triange extends Gemo {
    getArea() {
        return 123
    }
}

```



**接口和抽象类比较相像**

```typescript
interface Person {
    name: string
}

interface Teacher extends Person {
    TeachingAge: number
}

interface Student extends Person {
    age: number
}

// 写上 Person 类型可以 因为公共的属性是 name
const getUsetInfo = (user: Person) => {
    console.log(user.name);
}
```



### typescript 编译过程原理

编辑打包命令 package.json

```typescript
// 编译命令配置
"build": "tsc 文件名"
```



保存自动编译

```typescript
"start": "tsc -w"
```



编译输出位置

```typescript
 "outDir": "./dist",
```

并行执行命令

安装 concurrently 

```typescript
yarn add concurrently -D
```



```typescript
"dev:build": "tsc -w",
        "dev:start": "nodemon node ./dist/crowller.js",
        "dev": "concurrently npm:dev:*"
```



## typescript 配置文件 [未学]



## Ts 联合类型保护

```typescript
interface Person {
    name: string,
    fly: () => string
}

interface Teacher {
    TeachingAge: number,
    fly: () => string
}

function trainAnial(animal: Person | Teacher) {
    animal.fly()
}
```

在编写以上的代码中 在方法内通过 animal 点的时候编辑器只会提示两个类型的公有的方法 fly 此时不做语法提示是是非常正确的 无法保证 通过 animal 会点出 其他的非公有的属性

> 在这里直接点出非公有的属性 编辑器会提示报错

![image-20201222010135021](/Users/huozhuoyigeliuxiaojian/Library/Application Support/typora-user-images/image-20201222010135021.png)

如何解决这种问题的产生呢？？ **类型保护**

+ 类型断言的方式

```typescript
interface Brid {
    fly: boolean,
    sing: () => string,
}

interface Dog {
    fly: boolean,
    bark: () => number
}

function trainAnial(anial: Brid | Dog) {
    if (anial.fly) {
        (anial as Brid).sing()
    } else {
        (anial as Dog).bark()
    }
}
```

+ In 语法

```typescript
interface Brid {
    fly: boolean,
    sing: () => string,
}

interface Dog {
    fly: boolean,
    bark: () => number
}

function trainAnial(anial: Brid | Dog) {
    if ('sing' in anial) {
        anial.sing()
    } else {
        anial.bark()
    }
}
```



+ typeof 语法

```typescript
function add(first: string | number, second: string | number) {
    if (typeof first === 'string' && typeof second === 'string') {
        return first + second
    }
}
```



+ instanceof 语法

```typescript
class NumberObj {
    count: number
}

function sun(first: object | NumberObj, second: object | NumberObj) {
    if (first instanceof NumberObj && second instanceof NumberObj) {
        first.count + second.count
    }
}
```

> 使用类型保护 必须要使用 **class** 而不是 **interface**



## 枚举类型

```typescript
enum Status {
    OFFLINE,
    ONLINE,
    DELETED,
}

// 根据索引点出来的是 具体枚举的索引值
console.log(Status.OFFLINE); // 0
console.log(Status.ONLINE); // 1
console.log(Status.DELETED); // 2
```



可以设置枚举类型的开始索引值

```typescript
enum Status {
    OFFLINE = 1,
    ONLINE,
    DELETED,
}

// 根据索引点出来的是 具体枚举的索引值
console.log(Status.OFFLINE); // 1
console.log(Status.ONLINE); // 2
console.log(Status.DELETED); // 3
```



可以根据索引值反向映射值

```typescript
enum Status {
    OFFLINE,
    ONLINE,
    DELETED,
}

// 根据索引点出来的是 具体枚举的索引值
console.log(Status[0]); // OFFLINE
console.log(Status[1]); // ONLINE
console.log(Status[2]); // DELETED

console.log(Status[4]); // undefined
```



## 范型 泛指的类型

每个参数具体类型有调用者自身控制

```typescript
function join<T>(first: T, second: T) { // 如果调用者传递具体的类型 参数类型就是传递的具体的类型
    return `${first}${second}`
}

// 传递具体的类型之后 参数就必须传递具体的类型
join<string>('10', '20')
join<number>(10, 20)
```



可以声明为范型的数组

```typescript
function map<T>(first: T[]) {
    return first
}

map([12, 23, 34, 54])
```



多个范型参数

```typescript
function map<T, P>(first: T, second: P) {
    return `${first}${second}`
}

map<string, number>('liuxiaojian', 12)
```



返回类型是范型

```typescript
function map<T, P>(first: T, second: P): T {
    return first
}

map<string, number>('liuxiaojian', 12)
```





类中使用范型

```typescript
class DataManager<T> {
    constructor(private data: T[]) { }

    genItem(index: number): T {
        return this.data[index]
    }
}

const data = new DataManager<string>(['xiaojianjian'])
data.genItem(0)

```



类型使用范型继承接口

```typescript
interface Item {
    name: string,
}

class DataManager<T extends Item> {
    constructor(private data: T[]) { }

    genItem(index: number): string {
        return this.data[index].name
    }
}

const data = new DataManager([{ name: 'xiaojianjain' }])
data.genItem(0)

```





类使用范型继承基础数据类型

```typescript
interface Item {
    name: string,
}

class DataManager<T extends string | number> {
    constructor(private data: T[]) { }

    genItem(index: number): T {
        return this.data[index]
    }
}

const firstData = new DataManager<string>([])
const secondData = new DataManager<number>([])

```



变量函数的使用范型

```typescript
const func: <T>() => string = <T>() => {
    return '1234'
}

// ++++++++++++++++++++++++++

function hello<T>(params: T) {
    return params
}

const func: <T>(params: T) => T = hello

```





## 命名空间 namespace [类似模块化机制]

+ 尽可能少的配置全局变量

```typescript

class Header {
    constructor() {
        const header = document.createElement('div')
        header.innerText = 'Header'
        document.body.appendChild(header)
    }
}


class Content {
    constructor() {
        const content = document.createElement('div')
        content.innerText = 'Content'
        document.body.appendChild(content)
    }
}


class Footer {
    constructor() {
        const footer = document.createElement('div')
        footer.innerText = 'Footer'
        document.body.appendChild(footer)
    }
}

class Page {
    constructor() {
        new Header()
        new Content()
        new Footer()
    }
}
```

通过以上的方式会在全局创建 多个全局变量 header content footer page

```typescript
namespace Home {
    class Header {
        constructor() {
            const header = document.createElement('div')
            header.innerText = 'Header'
            document.body.appendChild(header)
        }
    }

    class Content {
        constructor() {
            const content = document.createElement('div')
            content.innerText = 'Content'
            document.body.appendChild(content)
        }
    }

    class Footer {
        constructor() {
            const footer = document.createElement('div')
            footer.innerText = 'Footer'
            document.body.appendChild(footer)
        }
    }

  	// 想要外界可以使用 就必须通过 export 的方式导出这个方法
    export class Page {
        constructor() {
            new Header()
            new Content()
            new Footer()
        }
    }
}

```

**通过以上的方式就只会在全局变量中创建 一个全局变量 Home Home可以点出导出的方法 Page**



+ 我们想要通过文件代码拆分的方式来将多个文件进行拆分 

  ```typescript
  namespace Components {
      // 命名空间东西如果需要被外界使用 就需要 export 导出
      export class Header {
          constructor() {
              const header = document.createElement('div')
              header.innerText = 'Header'
              document.body.appendChild(header)
          }
      }
  
  
      export class Content {
          constructor() {
              const content = document.createElement('div')
              content.innerText = 'Content'
              document.body.appendChild(content)
          }
      }
  
  
      export class Footer {
          constructor() {
              const footer = document.createElement('div')
              footer.innerText = 'Footer'
              document.body.appendChild(footer)
          }
      }
  }
  ```

  ```typescript
  /// <reference path="./Components.ts" /> // 告诉阅读者文件的应用关系
  
  namespace Home {
      export class Page {
          constructor() {
              new Components.Header()
              new Components.Content()
              new Components.Footer()
          }
      }
  }
  
  ```

  配置 package.json 文件

  ```typescript
  "outFile": "./dist/components.js"
  "module": "amd"
  ```

+ 命名空间中还可以暴露 接口

```typescript
namespace Components {
    // 命名空间东西如果需要被外界使用 就需要 export 导出

    export interface User {
        name: string,
    }
}
```

```typescript
/// <reference path="./Components.ts" />

namespace Home {
    export class Page {
        user: Components.User = {
            name: 'xiaojianjain'
        }
        constructor() {}
    }
}

```

+ 命名空间可以再次导出命名空间

```typescript
namespace Components {
    // 命名空间东西如果需要被外界使用 就需要 export 导出

    export interface User {
        name: string,
    }

    export namespace SubComponents {
        export class Test {}
    }
}
```

```typescript
/// <reference path="./Components.ts" />

namespace Home {
    export class Page {
        user: Components.User = {
            name: 'xiaojianjain'
        }
        constructor() {}
    }
}
```





## import 语法设置

```typescript
export class Header {
    constructor() {
        const header = document.createElement('div')
        header.innerText = 'Header'
        document.body.appendChild(header)
    }
}


export class Content {
    constructor() {
        const content = document.createElement('div')
        content.innerText = 'Content'
        document.body.appendChild(content)
    }
}


export class Footer {
    constructor() {
        const footer = document.createElement('div')
        footer.innerText = 'Footer'
        document.body.appendChild(footer)
    }
}
```



```typescript
import { Header, Content, Footer } from './Components'

class Page {
    constructor() {
        new Header()
        new Content()
        new Footer()
    }
}

new Page()
```

通过以上的方式编译的代码是 amd 规范的代码 不能在浏览器上运行 只能在node 环境运行 所以如果是在浏览器上运行时需要支持一些特定的node语法存在 可以借助第三方库 require.js 文件来处理





## 使用 Parcel 打包 TS 代码



## 类型描述文件





## 装饰器

### 类的装饰器

**装饰器就是对类或者方法的修饰符 本身本质就是函数 通过 @ 方式引入**

**在装饰类的时候就会执行 不是实例的时候才会执行** 

**默认一个装饰方法装饰多个类的时候只会执行一次**

**装饰器函数接受的是一个 constructor 构造函数 装饰器的收集是自赏而下 但是执行是指下而上**



```typescript
"experimentalDecorators": true,
"emitDecoratorMetadata": true,
```

```typescript
function testDecorator(constructor: any) {
    console.log('xiaojianjain')
}

@testDecorator
class Person { }

new Person()
```





在有的情况下有判断的情况我们可以使用工厂函数来处理这个情况 通过工厂的方式就可以传递参数

```typescript
function testDecorators(flag) {
    if(flag) {
       return function testDecorator(constructor: any) {
        constructor.prototype.getName = () => {
            console.log('哈哈哈')
        }
    	}
    }
  	return function() {}
}

@testDecorator(true)
class Person { }

new Person()
```

但是通过以上的方式会发现装饰器中的方法不能提示出来 





**标准装饰器的写法**

定义一个范型去继承空的构造函数 构造函数具有任意类型参数的数组

```typescript
function testDecorator<T extends new (...args: any[]) => any>(constructor: T) {
    return class extends constructor {
        name = 'xiaojian'
        getName() {
            return this.name
        }
    }
}

@testDecorator
class Person {
    name: string
    constructor(name: string) {
        this.name = name
    }

}

console.log(new Person('xiaojianajin').getName())
```

  但是编写以上代码的时候  **getName** 方法不会提示  ts 无法识别 该方法 如何处理

使用工厂函数处理装饰器的代码

```typescript
function testDecorator() {
    return function <T extends new (...args: any[]) => any>(constructor: T) {
        return class extends constructor {
            name = 'xiaojian'
            getName() {
                return this.name
            }
        }
    }
}

testDecorator()
```

testDecorator 执行过后返回的是装饰器的代码 通过装饰器方法装饰类即可实现

```typescript
function testDecorator() {
    return function <T extends new (...args: any[]) => any>(constructor: T) {
        return class extends constructor {
            name = 'xiaojian'
            getName() {
                return this.name
            }
        }
    }
}

const Test = testDecorator()(class Person {
    name: string
    constructor(name: string) {
        this.name = name
    }

})

console.log(new Test('xiaojianajin').getName())
```





## 方法装饰器

```typescript
// 普通方法 target 是类的原型 prototype
// 静态方法 target 是类的构造函数

// key 方法名称

// descriptor 控制装饰方法的执行逻辑

function textDecoder(target: any, key: string, descriptor: PropertyDescriptor) {
    // descriptor.writable = false // 不可重写

    // descriptor.value 获取属性和方法的值
    descriptor.value = function () {  // 更改原来方法的值
        return '1234'
    }
}

class Person {
    name: string
    constructor(name: string) {
        this.name = name
    }

    @textDecoder
    getName() {
        return this.name
    }
}
```





### 访问器的装饰器

```typescript
function textDecoder(target: any, key: string, descriptor: PropertyDescriptor) {
    descriptor.writable = false // (1)
}

class Person {
    private _name: string
    constructor(name: string) {
        this._name = name
    }

    get name() {
        return this._name
    }

    set name(name) {
        this._name = name
    }
}

const person = new Person('xioajianjain')
person.name = 'woshixiaojianjian'
console.log(person.name)

```

>  (1) 访问器装饰器不可修改 访问器装饰器就会报错 复制就会报错
>
> (2) 不能将多个修饰方法 同时作用于的 get set 方法





## 属性装饰器

```typescript
// 只能接受两个参数 不像其他的修饰器一样 三个参数
// target 值类的原型
// 如何实现第三个参数
function textDecoder(target: any, key: string): any {
    const descriptor: PropertyDescriptor = {
        writable: true
    }
    return descriptor
}

class Person {
    @textDecoder
    _name: string = 'xiaojianjain'
}

const person = new Person()
```



```typescript
// 实例是放在 原型上
function textDecoder(target: any, key: string): any {
    target[key] = 'woshixiaojianjain'
}

class Person {
    // name 属性是放在实例上
    @textDecoder
    _name: string = 'xiaojianjain'
}

const person = new Person()
console.log((person as any).__proto__._name) // 获取原型上的属性
```



## 参数装饰器

```typescript
// 类的原型 方法名称 参数的索引值
function paramsDecoracor(target: any, methods: string, paramIndex: number) {
    console.log(target, methods, paramIndex)
}

class Person {getName(@paramsDecoracor name: string, age: number) {
        console.log(name, age)
    }
}
```



小列子

```typescript
const userInfo: any = undefined

function catchError(mes: string) {
    return function catchError(target: any, key: string, descriptor: PropertyDescriptor) {
        const fn = descriptor.value // 这里就是修饰方法的具体业务逻辑
        descriptor.value = function () {
            try {
                fn()
            } catch (error) {
                console.log(mes)
            }
        }
    }
}


class Test {

    @catchError('userInfo.name 存在问题')
    getName() {
        return userInfo.name
    }

    @catchError('userInfo.name 存在问题')
    getAge() {
        return userInfo.age
    }
}

const test = new Test()
test.getName()
test.getAge()

```





## [reflect-metadata](https://github.com/rbuckton/reflect-metadata)



```typescript
import 'reflect-metadata'

// const user = {
//     name: 'xiaojianjain'
// }

// Reflect.defineMetadata('data', 'test', user) // 存储元数据
// console.log(Reflect.getMetadata('data', user)) // 获取元数据

// // 在类上设置元数据
// @Reflect.metadata('data', 'test')
// class User {
//     name = 'dell'
// }

// // 在类上获取元数据
// console.log(Reflect.getMetadata('data', User))


// 在类的方法上设置和获取元数据
// class User {
//     @Reflect.metadata('data', 'test')
//     name = 'dell'
// }

// // 元数据时可以继承
// class Teacher extends User { }

// 获取的时候就需要在类的原型上获取
// console.log(Reflect.getMetadata('data', User.prototype, 'name'))

// 判断是有具有元数据
// console.log(Reflect.hasMetadata('data', User.prototype, 'name'))

// 判断本身是否具有元数据 继承不算
// console.log(Reflect.hasOwnMetadata('data', Teacher.prototype, 'name'))

// 在类的方法上设置和获取元数据
class User {
    @Reflect.metadata('data', 'test')
    getName() { }
}

// 元数据时可以继承
class Teacher extends User { }

// 查看本身具有多少个元数据 【继承都可以】
// 前三个是默认
// ['design:returntype', 'design:paramtypes', 'design:type', 'data' ]
// console.log(Reflect.getMetadataKeys(User.prototype, 'getName'))


// 只查看本身的元数据 继承不算
console.log(Reflect.getOwnMetadataKeys(Teacher.prototype, 'getName'))

// 可以删除元数据
Reflect.deleteMetadata('data', User.prototype)


```





## 装饰器执行顺序

```typescript
import 'reflect-metadata'

function showData(target: typeof User) {
    for (let key in target.prototype) {
        const data = Reflect.getMetadata('data', target.prototype, key)
        console.log(data)
    }
}

function setData(datakey: string, msg: string) {
    // target 类的原型
    // key 方法名
    return function (target: User, key: string) {
        Reflect.defineMetadata(datakey, msg, target, key)
    }
}

@showData
class User {
    @Reflect.metadata('data', 'name')
    getName() { }

    @setData('data', 'age')
    getAge() { }
}
```

+ **方法的装饰器执行快于类的装饰器**

