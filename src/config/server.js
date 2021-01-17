const port = 3003

const bodyParser = require('body-parser')
const express = require('express')
const server = express()
const cors = require('cors')
const queryParser = require('express-query-int')

// Set default node environment to development 
//process.env.NODE_ENV = process.env.NODE_ENV || 'development'

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(cors())
server.use(queryParser())


// Vai carregar o express se for o modo de desenvolvimento
// se for TESTE não irá carregar
// if (server.get('env') == 'development') {
//     server.listen(port, function() {
//         console.log(`Backend is running on port ${port} at ${server.get('env')}.`)
//     })
// }


server.listen(port, function() {
    console.log(`Backend is running on port ${port} at ${server.get('env')}.`)
})


console.log('vv server start vv')
console.log('Server is listening on port ' + server.port);
console.log(server.get('env'))
console.log('^^ server start ^^')


module.exports = server