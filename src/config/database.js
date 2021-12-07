const mongoose = require('mongoose')
const config = require('./config')

mongoose.connect(config.mongodbURI, {useNewUrlParser: true, useUnifiedTopology: true })

mongoose.connection.on('connected', function(){
    console.log("Conn: Mongoose default connection is open to ", config.environment);
})
mongoose.connection.on('error', function(err){
    console.log("Err: Mongoose default connection has occured "+err+" error");
})
mongoose.connection.on('disconnected', function(){
    console.log("Disconn: Mongoose default connection is disconnected");
})
mongoose.connection.on('reconnected', function() {
    console.log('Reconn: Reconnected to MongoDB');
})
process.on('SIGINT', function(){
    mongoose.connection.close(function(){
        console.log("Mongoose default connection is disconnected due to application termination");
        process.exit(0)
    })
})

mongoose.Error.messages.general.required = "O atributo '{PATH}' é obrigatório."
mongoose.Error.messages.Number.min = 
    "O '{VALUE}' informado é menor que o limite mínimo de '{MIN}'."
mongoose.Error.messages.Number.max = 
    "O '{VALUE}' informado é maior que o limite máximo de '{MAX}'."
mongoose.Error.messages.String.enum =
    "'{VALUE}' não é válido para o atributo '{PATH}'."

module.exports = mongoose