var config = {};

config.production = {};
config.test = {};
config.development = {};

config.production.mongodbURI = process.env.MONGODB_URI
config.test.mongodbURI = "mongodb://localhost/coriscoTST"
config.development.mongodbURI = process.env.MONGODB_URI

module.exports = config;