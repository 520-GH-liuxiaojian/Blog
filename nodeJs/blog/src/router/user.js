const { SuccessModel, ErrorModel } = require('../model/responseModel')
const { redis_set } = require('../db/redis')

const handleUserRouter = (request, response) => {
    const method = request.method

    if (method === 'GET' && request.path === '/api/user/login') {
        // const username = request.cookie['username']
        const { username } = request.query
        if (username === 'xiaojianjian') {
            request.session.username = 'xiaojianjian'
            redis_set(request.sessionId, request.session) // 数据云同步 redis 数据群中
            return new SuccessModel({ username }, '登陆成功')
        }

        return new ErrorModel({}, '登陆失败', 500)
    }

    if (method === 'GET' && request.path === '/api/user/login-test') {
        const username = request.session.username
        if (username) {
            return new SuccessModel(request.session, '登陆成功')
        }
        return new ErrorModel({}, '登陆失败', 500)
    }
}

module.exports = handleUserRouter
