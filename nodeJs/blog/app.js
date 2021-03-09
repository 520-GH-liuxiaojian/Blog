const qs = require('qs')
const handleBlogRouter = require('./src/router/blob')
const handleUserRouter = require('./src/router/user')
const { access } = require('./src/utils/log')
const { redis_get, redis_set } = require('./src/db/redis')

const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (1000 * 60 * 60 * 24 * 1)) // 过期时间是 24 小时
    return d.toGMTString()
}

// session 数据
// const SESSION_DATA = {}

const getPostData = request => {
    return new Promise((resolve, reject) => {
        const { method, headers } = request
        if (method.toUpperCase() !== 'POST' || headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }

        let postData = ''

        request.on('data', chunk => {
            postData += chunk.toString()
        })

        request.on('end', () => {
            if (!postData) {
                resolve({})
                return
            }
            resolve(JSON.parse(postData))
        })
    })
}

const serverHandle = (request, response) => {
    const { method, url, headers } = request
    access(`${method} -- ${url} -- ${headers['user-agent']} -- ${Date.now()}`)

    response.setHeader('Content-type', 'application/json')
    request.path = url.split('?')[0]

    request.query = qs.parse(url.split('?')[1])

    request.cookie = {}
    const cookieStr = request.headers.cookie ?? ''
    cookieStr && cookieStr.split(';').forEach(item => {
        const key = item.split('=')[0].trim()
        const value = item.match(/=(\S*)/)[1]
        request.cookie[key] = value
    })

    // let userId = request.cookie.userid
    // if (userId) {
    //     if (!SESSION_DATA[userId]) {
    //         SESSION_DATA[userId] = {}
    //     }
    // } else {
    //     needSetCookie = true
    //     userId = `${Date.now()}_${Math.random()}`
    //     SESSION_DATA[userId] = {}
    // }
    // request.session = SESSION_DATA[userId]

    let needSetCookie = false
    let userId = request.cookie.userid
    if (!userId) {
        needSetCookie = true
        userId = `${Date.now()}_${Math.random()}`
        redis_set(userId, {})
    }
    request.sessionId = userId
    redis_get(request.sessionId).then(sessionData => {
        if (sessionData == null) {
            redis_set(request.sessionId, {})
            request.session = {}
        } else {
            request.session = sessionData
        }

        return getPostData(request)
    }).then(result => {
        request.body = result

        const blobData = handleBlogRouter(request, response)
        if (blobData) {
            if (needSetCookie) {
                const cookie = `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`
                response.setHeader('Set-Cookie', cookie)
            }
            response.end(JSON.stringify(blobData))
            return
        }

        const userData = handleUserRouter(request, response)
        if (userData) {
            if (needSetCookie) {
                const cookie = `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`
                response.setHeader('Set-Cookie', cookie)
            }
            response.end(JSON.stringify(userData))
            return
        }

        response.writeHead(404, { "Content-type": "text/plain" })
        response.write("404 Not Found\n")
        response.end()
    })
}

module.exports = serverHandle
