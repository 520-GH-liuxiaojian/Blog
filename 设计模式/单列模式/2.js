function Window(name) {
    this.name = name
}

Window.prototype.getName = function() {
    console.log(this.name)
}

let CreateSingle = (function() {
    let instance
    return function(name) {
        if(!instance) {
            instance = new Window(name)
        }
        return instance
    }
})()

let w1 = new CreateSingle('xiao')
let w1 = new CreateSingle('jian')