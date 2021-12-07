const config = require('./config')
const PORT = config.backendPORT || 5000

const bodyParser = require('body-parser')
const express = require('express')
const server = express()
const cors = require('cors')
const queryParser = require('express-query-int')

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(cors())
server.use(queryParser())

server.listen(PORT, () => {
    console.log(`Backend is running on port ${PORT} at ${server.get('env')}.`)
    console.log('vv server start vv')
    console.log('Server is listening on port ' + config.backendPORT + '|' + PORT);
    console.log(server.get('env'))
    console.log('^^ server start ^^')
})
server.on( 'close', () => console.log('Closing') )

module.exports = server