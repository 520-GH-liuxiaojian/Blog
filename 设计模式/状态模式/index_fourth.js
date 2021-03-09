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
