var config = {};

config.production = {};
config.test = {};
config.development = {};

config.production.mongodbURI = process.env.MONGODB_URI
config.test.mongodbURI = process.env.MONGODB_URI
config.development.mongodbURI = process.env.MONGODB_URI
config.cronVar = process.env.CRON_VAR
config.backendURL = process.env.BACKEND_URL
config.backendPORT = process.env.BACKEND_PORT

module.exports = config;