const env = process.env.NODE_ENV

let MYSQL_CONFIG
let REDIS_CONFIG

if (env === 'develop') {
    MYSQL_CONFIG = {
        host: 'localhost',
        user: 'root',
        password: '12345678',
        port: '3306',
        database: 'myBlog'
    }

    REDIS_CONFIG = {
        port: 6379,
        host: '127.0.0.1'
    }
}

if (env === 'production') {
    MYSQL_CONFIG = {
        host: 'localhost',
        user: 'root',
        password: '12345678',
        port: '3306',
        database: 'myBlog'
    }

    REDIS_CONFIG = {
        port: 6379,
        host: '127.0.0.1'
    }
}

module.exports = {
    MYSQL_CONFIG,
    REDIS_CONFIG,
}
