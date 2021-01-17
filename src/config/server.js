const port = process.env.PORT || 5000

const bodyParser = require('body-parser')
const express = require('express')
const server = express()
const cors = require('cors')
const queryParser = require('express-query-int')

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(cors())
server.use(queryParser())

server.listen(port, () => {
    console.log(`Backend is running on port ${port} at ${server.get('env')}.`)
    console.log('vv server start vv')
    console.log('Server is listening on port ' + process.env.PORT);
    console.log(server.get('env'))
    console.log('^^ server start ^^')
})

module.exports = server