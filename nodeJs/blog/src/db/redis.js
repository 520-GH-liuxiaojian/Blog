const redis = require('redis')
const { REDIS_CONFIG } = require('../config/db')

const redisClient = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host)
redisClient.on('error', error => {
    console.log(error)
})

function redis_set(key, value) {
    if (typeof value === 'object') {
        value = JSON.stringify(value)
    }

    redisClient.set(key, value, redis.print)
}


function redis_get(key) {
    return new Promise((resolve, reject) => {
        redisClient.get(key, (error, value) => {
            if (error) return reject(error)
            if (value == null) return resolve(null)

            try {
                resolve(JSON.parse(value))
            } catch (ex) {
                console.error(ex)
                resolve(value)
            }
        })
    })
}

module.exports = { redis_get, redis_set }
