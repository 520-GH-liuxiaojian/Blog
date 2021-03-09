function log(target, name, descriptor) {
    let oldValue = descriptor.value
    descriptor.value = function () {
        console.log(`calling ${name} width`, arguments)
        return oldValue.apply(this, arguments)
    }
    return descriptor
}
