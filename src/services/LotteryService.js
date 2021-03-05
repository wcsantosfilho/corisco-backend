const LotteryModel = require('../models/lotteryModel')

module.exports = class LotteryService {
    constructor (betDate, initialRound, finalRound) {
        this.betDate = betDate
        this.initialRound = initialRound
        this.finalRound = finalRound
    }

    // Adiciona um nova aposta no banco
    async NewBet() {
        const betRecord = await new LotteryModel.bets( {...this} ).save()
        return { betDate: betRecord.betDate, 
                initialRound: betRecord.initialRound, 
                finalRound: betRecord.finalRound
            }
    }

    // Busca uma aposta no banco
    async getLastBet() {
        const betRecord = LotteryModel.bets
        var result = await betRecord.find().limit(1).sort( { finalRound: -1 })
        return result
    }

    // Busca todas as apostas do banco
    async getBets() {
        const betRecord = LotteryModel.bets
        var result = await betRecord.find()    
    }

}