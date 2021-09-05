var config = {};

config.production = {};
config.test = {};
config.development = {};

config.production.mongodbURI = process.env.MONGODB_URI
config.test.mongodbURI = "mongodb://localhost/coriscoTST"
//config.development.mongodbURI = "mongodb://localhost/corisco"
config.development.mongodbURI = "mongodb+srv://coriscoDbUser:66JywPUeIvPGUGGM@corisco.vq9ow.mongodb.net/corisco?retryWrites=true&w=majority"

module.exports = config;