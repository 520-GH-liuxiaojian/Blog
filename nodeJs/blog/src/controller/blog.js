const { exec } = require('../db/mysql')

const getList = async (auther, keywork) => {
    return await exec(`select * from users`)
}

const newBlog = (blogData = {}) => ({ id: Date.now() })
const updateBlog = (blogData) => false

module.exports = {
    getList,
    newBlog,
    updateBlog
}