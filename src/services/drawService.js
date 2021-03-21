const LotteryModel = require('../models/lotteryModel')

module.exports = class DrawService {
    constructor (drawDate, drawRound) {
        this.drawDate = drawDate
        this.drawRound = drawRound
    }

    // Adiciona um nova aposta no banco
    async NewDraw() {
        // Regra de negócio: não pode haver sorteio duplicado
        const findResult = await LotteryModel.draws.find({
            drawRound: this.drawRound,
        })

        // findResult.lenght deve set igual a zero (not found) para poder inserir o sorteio
        if ( findResult.length == 0) {
            const drawRecord = await new LotteryModel.draws( {...this} ).save()
                return { status: 200,
                    payload: drawRecord
                }
        } else {
            return { status: 422,
                payload: { status: 422,
                    message: "Registro duplicado para este sorteio" }
                }
        }
    }

}