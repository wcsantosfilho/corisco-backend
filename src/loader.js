const server = require('./config/server')
const db = require('./config/database')
const cron = require('./config/cronjob')
require('./config/routes')(server)
module.exports = { server, db }