const Plant = require('./method')
const Factory = require('./factory')

class Orange extends Plant {
    constructor(flavour) {
        super('苹果')
        this.flavour = flavour
    }
}

class OrangeFactory extends Factory {
    static create() {
        return new Orange('酸酸的')
    }
}

module.exports = OrangeFactory

