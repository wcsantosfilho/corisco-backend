const LotteryModel = require('../models/lotteryModel')

/* drawService
 * Esta classe de 'Service' expõe metodos para a camada 'route'. Estes métodos chamam
 * métodos do 'model'
 */
module.exports = class BetService {
    constructor ( betDate = null, initialRound = null, finalRound = null ) {
        this.betDate = betDate
        this.initialRound = initialRound
        this.finalRound = finalRound
    }

    // Adiciona um nova aposta no banco
    async NewBet() {
        try {
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
        } catch (e) {
            console.log(e)
            return { status: 500, 
                payload: { status: 500,
                    messagem: "Erro inesperado",
                    stack: JSON.stringify(e)
                }
            }
        }
    }

    // Busca a última aposta no banco
    async getLastBet() {
        try {
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
        } catch (e) {
            console.log(e)
            return { status: 500, 
                payload: { status: 500,
                    messagem: "Erro inesperado",
                    stack: JSON.stringify(e)
                }
            }
        }        
    }

    // Busca todas as apostas do banco
    async getBets() {
        try {
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
        } catch (e) {
            console.log(e)
            return { status: 500, 
                payload: { status: 500,
                    messagem: "Erro inesperado",
                    stack: JSON.stringify(e)
                }
            }
        }
    }
}