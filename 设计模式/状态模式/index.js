class Battery {
    constructor() {
        this.amount = 'high'
    }

    show() {
        if(this.amount === 'high') {
            console.log('现实绿色')
            this.amount = 'middle'
        } else if(this.amount === 'middle') {
            console.log('现实黄色')
            this.amount = 'low'
        } else if(this.amount === 'low') {
            console.log('现实红色')
        }
    }
}

const battery = new Battery()
battery.show()
battery.show()
battery.show()
