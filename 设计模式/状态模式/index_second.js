class SuccessState {
    show() {
        console.log('显示绿色')
    }
}

class WarningState {
    show() {
        console.log('显示黄色')
    }
}
class ErrorState {
    show() {
        console.log('显示红色')
    }
}


class Battery {
    constructor() {
        this.amount = 'high'
        this.state = new SuccessState()
    }

    show() {
        // 将现实的逻辑委托给了状态对象
        // 内部还需要维护状态的变化
        this.state.show()

        if(this.amount === 'high') {
            this.amount = 'middle'
            this.state = new WarningState()
        } else if(this.amount === 'middle') {
            this.amount = 'low'
            this.state = new ErrorState()
        }
    }
}

const battery = new Battery()
battery.show()
battery.show()
battery.show()
