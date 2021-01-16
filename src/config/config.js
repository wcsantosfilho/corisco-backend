var config = {};

config.production = {};
config.test = {};
config.development = {};

config.production.mongodbURI = "mongodb://localhost/coriscoPRD"
config.test.mongodbURI = "mongodb://localhost/coriscoTST"
config.development.mongodbURI = "mongodb://localhost/corisco"

module.exports = config;