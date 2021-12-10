const config = require('./config')
const logger = require('heroku-logger')

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
    logger.info(`Backend is running on port ${PORT} at ${server.get('env')}.`)
    logger.info('vv server start vv')
    logger.info(`Server is listening on port ${config.backendPORT} | ${PORT}`);
    logger.info('^^ server start ^^')
})
server.on( 'close', () => console.log('Closing') )

module.exports = server