// function multi(n) {
//     return (n<1) ? 1 : n * multi(n-1)
// }
//
// let sum = function (n) {
//     let result = 0
//     for (let i = 1; i <= n; i++) {
//         result += multi(i)
//     }
//     return result
// }

let sum = (function() {
    let cache = Object.create(null)

    function multi(n) {
        return (n<1) ? 1 : n * (cache[n-1] ?? multi(n-1) )
    }

    return function (n) {
        let result = 0
        for (let i = 1; i <= n; i++) {
            let res = 0
            res += multi(i)
            cache[i] = res
            result += res
        }
        cache = null
        return result
    }
})()

console.time('ent')
console.log(sum(100000000))
console.timeEnd('ent')
