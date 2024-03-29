const LotteryModel = require('../models/lotteryModel')
const logger = require('heroku-logger')
const path = require('path');
const scriptName = path.basename(__filename);

/* drawService
 * Esta classe de 'Service' expõe metodos para a camada 'route'. Estes métodos
 * chamam métodos do 'model'
 */

module.exports = class DrawService {
    constructor ( drawDate = null, drawRound = null ) {
        this.drawDate = drawDate
        this.drawRound = drawRound
    }

    // Adiciona um nova aposta no banco
    async NewDraw() {
        try {
            logger.info(`[${scriptName}] newDraw`)
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
        } catch (error) {
            logger.error(error)
            return { status: 500, 
                payload: { status: 500,
                    messagem: "Erro inesperado",
                    stack: JSON.stringify(error)
                }
            }
        }
    }

    // Busca o última concurso no banco
    async getLastDraw() {
        try {
            logger.info(`[${scriptName}] getLastDraw`)
            const drawRecord = LotteryModel.draws
            const findResult = await drawRecord.find().limit(1).sort( { drawRound: -1 })
            if ( findResult.length > 0) {
                return { status:200,
                    payload: findResult
                }
            } else {
                return { status: 404,
                    payload: { status: 404,
                        messagem: "Nenhum concurso encontrado" }
                    }
            }
        } catch (error) {
            logger.error(error)
            return { status: 500, 
                payload: { status: 500,
                    messagem: "Erro inesperado",
                    stack: JSON.stringify(error)
                }
            }
        }        
    }
}