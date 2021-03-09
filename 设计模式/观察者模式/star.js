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

function loadImg(src) {
    return new Promise((resolve, reject) => {
        const img = document.createElement('img')
        img.onload = function () {
            resolve(img)
        }
        img.onerror = function () {
            reject('图片加载失败')
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
