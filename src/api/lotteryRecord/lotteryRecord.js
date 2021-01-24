const Mongoose = require('mongoose')

/*
 * Bet represent a single "paper" related to a N round number 
 * Each round is a draw executed by lottery organization, in Brazil: Caixa Economica Federal
 */
const betSchema = new Mongoose.Schema({
    betDate: { type: Date, required: true },
    initialRound: { type: Number, min: 0, required: true},
    finalRound: { type: Number, min: 0, required: true}
})

const drawSchema = new Mongoose.Schema({
    drawDate: { type:Date, required: true },
    drawRound: { type: Number, min: 0, required: true}
})

var bets = Mongoose.model('bets', betSchema)
var draws = Mongoose.model('draws', drawSchema)

module.exports = { bets, draws }