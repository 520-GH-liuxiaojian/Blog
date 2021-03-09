const mysql = require('mysql')
const { MYSQL_CONFIG } = require('../config/db')

const connon = mysql.createConnection(MYSQL_CONFIG)

connon.connect()

function exec(sql) {
    return new Promise((resolve, reject) => {
        connon.query(sql, (error, result) => {
            if (error) return reject(error)
            resolve(result)
        })
    })
}

module.exports = { exec }
