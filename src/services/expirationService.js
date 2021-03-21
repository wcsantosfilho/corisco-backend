const DrawService = require('./drawService')
const BetService = require('./betService')

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
    constructor (expirationDummy) {
        this.expirationDummy = expirationDummy
    }

    // last bet is equal last draw?
    async checkIfLastBetIsEqualDraw() {
        try {
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
                    return { status:200,
                        payload: { status: 200,
                            message: `Sua última aposta ${lastBet} já foi sorteada no concurso ${lastDraw}.`
                        }
                    }
                } else {
                    return { status: 404,
                        payload: { status: 404,
                            message: "Não encontrou concurso ou aposta para comparar" }
                        }
                }
            }
        } catch (e) {
            console.log(e)
            return { status: 500, 
                payload: { status: 500,
                    messagem: "Erro inesperado",
                    stack: JSON(e)
                }
            }
        }
    }
}