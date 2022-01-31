const DrawService = require('./drawService')
const BetService = require('./betService')
const logger = require('heroku-logger')
const path = require('path');
const scriptName = path.basename(__filename);

/* expirationService
 * Esta classe usa métodos de duas outras classes, bet e draw, para 
 * validar a expiração de apostas em relação aos concursos realizados.
 * Exemplo: Verificar se o próximo concurso tem ou não uma aposta feita
 */

 /*
  * DÚVIDA: Isso aqui não está MUITO dependente da implementação? do Banco de dados? do mongodb?
  *
  */

module.exports = class ExpirationService {
    constructor (expirationStatus = null) {
        this.expirationStatus = expirationStatus
    }

    // last bet is equal last draw?
    async checkIfLastBetIsEqualDraw() {
        try {
            logger.info(`[${scriptName}] checkIfLastBetIsEqualDraw`)
            // instancia a classe DrawService
            const draw = new DrawService()
            // instancia a classe BetService
            const bet = new BetService()
            // chama o serviço para buscar a última aposta
            var resultLastBet = await bet.getLastBet()
            // chama o serviço para buscar o último concurso
            var resultLastDraw = await draw.getLastDraw()

            if ( resultLastBet.status == 200 && resultLastDraw.status == 200) {
                var lastBet = resultLastBet.payload[0].finalRound
                var lastDraw = resultLastDraw.payload[0].drawRound
                if ( lastBet == lastDraw ) {
                    this.expirationStatus = 1
                    return { status: 200,
                        payload: { expirationStatus: this.expirationStatus,
                            lastBet: lastBet,
                            lastDraw: lastDraw,
                            subject: 'A última se foi',
                            message: `Fique atento! Você não tem mais apostas. O último concurso, ${lastBet} já foi sorteado.`
                        }
                    }
                } 
                if ( lastBet > lastDraw) {
                    this.expirationStatus = 2
                    return { status: 200,
                        payload: { expirationStatus: this.expirationStatus,
                            lastBet: lastBet,
                            lastDraw: lastDraw,
                            subject: 'Ainda está tudo bem',
                            message: `Tudo OK. Você tem apostas até o concurso: ${lastBet}. O concurso atual ainda está em: ${lastDraw}.`
                        }
                    }
                }
                if ( lastBet < lastDraw) {
                    this.expirationStatus = 3
                    return { status: 200,
                        payload: { expirationStatus: this.expirationStatus,
                            lastBet: lastBet,
                            lastDraw: lastDraw,
                            subject: 'A casa caiu',
                            message: `CORRA! Você está atrasado nas suas apostas. O último concurso que você tem uma aposta é: ${lastBet}, mas o próximo concurso será o ${lastDraw+1}.`
                        }
                    }
                }
            }
            if ( resultLastBet.status != 200 || resultLastDraw.status != 200) {
                this.expirationStatus = 999
                return { status: 404,
                    payload: { expirationStatus: this.expirationStatus,
                        lastBet: lastBet,
                        lastDraw: lastDraw,
                        message: "PROBLEMA. Não encontrei concursos e apostas para comparar!" 
                    }
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