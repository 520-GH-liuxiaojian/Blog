const path = require('path')
const fs = require('fs')


function writeLog(writeStream, log) {
    writeStream.write(log + '\n')
}

function createWriteStream(fileName) {
    const fullFileName = path.join(__dirname, '../', '../', 'logs', fileName)
    const result = fs.createWriteStream(fullFileName, {
        flags: 'a'
    })
    return result
}

const accessWriteStream = createWriteStream('access.log')

// 写入访问日志
function access(log) {
    writeLog(accessWriteStream, log)
}

module.exports = { access }
