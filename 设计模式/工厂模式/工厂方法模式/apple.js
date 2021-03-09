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
