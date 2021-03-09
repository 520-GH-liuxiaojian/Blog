import Factory from './factory'
import Plant from './method'

class Orange extends Plant {
    constructor(public flavour: string) {
        super('苹果')
    }
}

class OrangeFactory extends Factory {
    create() {
        return new Orange('酸酸的')
    }
}

export default OrangeFactory