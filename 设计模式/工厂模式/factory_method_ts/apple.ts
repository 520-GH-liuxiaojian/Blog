import Factory from './factory'
import Plant from './method'

class Apple extends Plant {
    constructor(public flavour: string) {
        super('苹果')
    }
}

class AppleFactory extends Factory {
    static create() {
        return new Apple('甜甜的')
    }
}

export default AppleFactory