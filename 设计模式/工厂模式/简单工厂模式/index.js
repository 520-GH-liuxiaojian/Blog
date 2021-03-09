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
        }catch (e) {
            throw new Error('没有您需要的!!, 抱歉')
        }
    }
}

const factory = new Factory()
const result = factory.create('apple', '甜甜的')
console.log(result)
