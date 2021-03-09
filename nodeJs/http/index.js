const http = require('http')
const qs = require('qs')

const server = http.createServer((request, response) => {
    if (request.method === 'POST') {
        let postData = ''
        request.on('data', chunk => {
            postData += chunk.toString()
        })

        request.on('end', () => {
            response.end('holle world')
        })
    }
})

server.listen(8888, () => {
    console.log('server is running...')
})