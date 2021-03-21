const LotteryModel = require('../models/lotteryModel')

module.exports = class BetService {
    constructor (betDate, initialRound, finalRound) {
        this.betDate = betDate
        this.initialRound = initialRound
        this.finalRound = finalRound
    }

    // Adiciona um nova aposta no banco
    async NewBet() {
        // Regra de negócio: não pode haver aposta duplicada
        const findResult = await LotteryModel.bets.find({
            initialRound: this.initialRound,
            finalRound: this.finalRound
        })

        // findResult.lenght deve set igual a zero (not found) para poder inserir a aposta
        if ( findResult.length == 0) {
            const betRecord = await new LotteryModel.bets( {...this} ).save()
                return { status: 200,
                    payload: betRecord
                }
        } else {
            return { status: 422,
                payload: { status: 422,
                    message: "Registro duplicado para esta aposta" }
                }
        }
    }

    // Busca a última aposta no banco
    async getLastBet() {
        const betRecord = LotteryModel.bets
        const findResult = await betRecord.find().limit(1).sort( { finalRound: -1 })
        if ( findResult.length > 0) {
            return { status:200,
                payload: findResult
            }
        } else {
            return { status: 404,
                payload: { status: 404,
                    messagem: "Nenhuma aposta encontrada" }
                }
        }
    }

    // Busca todas as apostas do banco
    async getBets() {
        const betRecord = LotteryModel.bets
        const findResult = await betRecord.find()
        if ( findResult.length != 0) {
            return { status: 200,
                payload: findResult 
            }
        } else {
            return { status: 404,
                payload: { status: 404,
                    message: "Nenhuma aposta encontrada" }
                }
        }
    }

}