class Promise {
    constructor(fn) {
        this.state = 'initial'
        this.successes = []
        this.errors = []
        let resolve = data => {
            this.state = 'fulfilled'
            this.successes.forEach(item => item(data))
        }
        let reject = error => {
            this.state = 'failed'
            this.errors.forEach(item => item(error))
        }
        fn(resolve, reject)
    }
    then(success, error) {
        this.successes.push(success)
        this.errors.push(error)
    }
}

let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        const num = Math.random()
        num > .5 ? resolve(num) : reject(num)
    }, 5000)
})
