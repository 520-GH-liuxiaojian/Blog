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
