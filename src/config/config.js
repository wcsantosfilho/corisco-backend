const dotenv = require('dotenv')
const logger = require('heroku-logger')

dotenv.config({silent: true})

var config = {};
config.environment = process.env.NODE_ENV.trim()
config.cronVar = process.env.CRON_VAR
config.environment = process.env.NODE_ENV
config.sendgridApiKey = process.env.SENDGRID_API_KEY

if (config.environment == "production") {
    logger.info(`[config] ${config.environment}`)
    config.mongodbURI = process.env.MONGODB_URI_PROD
    config.backendURL = process.env.BACKEND_URL_PROD
    config.backendPORT = process.env.PORT || process.env.BACKEND_PORT_PROD
}
if (config.environment == "test") {
    logger.info(`[config] ${config.environment}`)
    config.mongodbURI = process.env.MONGODB_URI_TEST
    config.backendURL = process.env.BACKEND_URL_TEST
    config.backendPORT = process.env.PORT || process.env.BACKEND_PORT_TEST
}
if (config.environment == "development") {
    logger.info(`[config] ${config.environment}`)
    config.mongodbURI = process.env.MONGODB_URI_DEV
    config.backendURL = process.env.BACKEND_URL_DEV
    config.backendPORT = process.env.BACKEND_PORT_DEV 
}

module.exports = config;