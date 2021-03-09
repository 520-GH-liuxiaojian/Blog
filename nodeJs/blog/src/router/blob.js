const { SuccessModel, ErrorModel } = require('../model/responseModel')
const { getList, newBlog, updateBlog } = require('../controller/blog')

const handleBlogRouter = (request, response) => {
    const method = request.method

    if (method === 'GET' && request.path === '/api/blog/list') {
        const { auther = '', keywork = '' } = request.query
        return new SuccessModel(getList(auther, keywork), '获取成功')
    }

    if (method === 'GET' && request.path === '/api/blog/detail') {
        return {
            mes: '这是获取博客详情接口'
        }
    }

    if (method === 'POST' && request.path === '/api/blog/new') {
        const blogData = request.body
        return new SuccessModel(newBlog(blogData), '新建成功')
    }

    if (method === 'POST' && request.path === '/api/blog/update') {
        const result = updateBlog(request.body)
        if (result) {
            return new SuccessModel(result, '博客修改成功')
        }
        return new ErrorModel(result, '博客修改失败', 500)
    }

    if (method === 'POST' && request.path === '/api/blog/delete') {
        return {
            mes: '这是删除博客的接口'
        }
    }
}

module.exports = handleBlogRouter
