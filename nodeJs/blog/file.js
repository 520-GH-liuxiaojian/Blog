const http = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer((request, response) => {
    const method = request.method
    if (method === 'GET') {
        const filePath = path.resolve(__dirname, 'data.txt')
        const stream = fs.createReadStream(filePath)
        stream.pipe(response)
    }
})

server.listen(8000)