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