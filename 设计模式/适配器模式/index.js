const fs = require('fs')

function promisify(fn) {
    return function (...args) {
        return new Promise((resolve, reject) => {
            fn(...args, (error, data) => {
                error ? reject(error) : resolve(data)
            })
        })
    }
}

let readFile = promisify(fs.readFile)

(async function read() {
    let one = await readFile('1.txt', 'utf8')
    let two = await readFile('2.txt', 'utf8')
    let three = await readFile('3.txt', 'utf8')
    console.log(one, two, three)
})()
