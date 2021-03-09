class Circle {
    draw() {
        console.log('画一个图形')
    }
}

class Decorator {
    constructor(circle) {
        this.circle = circle
    }

    draw() {
        this.circle.draw()
        this.setRedBorder()
    }

    setRedBorder() {
        console.log('设置红色边框')
    }
}

let circle = new Circle()
circle.draw()

let dec = new Decorator(circle)
dec.draw()
