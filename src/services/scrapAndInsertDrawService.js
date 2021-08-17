const DrawService = require('./drawService')
const ScrapService = require('./scrapService')

/* drawResultService
 * Esta classe usa métodos de duas outras classes, scrap e draw, para 
 * fazer a leitura do último concurso realizado no site da Caixa e
 * inserir no banco de dados os dados deste concurso (draw)
 */

module.exports = class ScrapAndInsertDrawService {
    constructor (drawResultStatus = null) {
        this.drawResultStatus = drawResultStatus
    }

    // insert Draw read from Caixa website
    async readCaixaPageAndInsertDraw() {
        try {
            // instancia a classe ScrapService
            const scrap = new ScrapService()
            console.log('[scrapAndInsertDrawService] instancia ScrapService: ', scrap, '\n')
            // chama o serviço para buscar a última aposta
            const resultScrap = await scrap.scrapLastDraw()
            console.log('[scrapAndInsertDrawService] depois de scrapLastDraw: ', resultScrap, '\n')
            const drawDate = new Date()
            const drawRound = 1010
            // instancia a classe DrawService
            const draw = new DrawService(drawDate, drawRound)
            // chama o serviço para criar uma nova aposta
            const resultNewDraw = await draw.NewDraw()
            console.log('[scrapAndInsertDrawService] depois de NewDraw() ', resultNewDraw, '\n')
            // envia como retorno o payload recebido do Service
            if (resultNewDraw != null && resultNewDraw.status == 200) {
                return { status: 200,
                    payload: { status: 200,
                        message: `Último concurso ${drawRound} lido da página da Caixa foi inserido em ${resultNewDraw}.`
                    }
                }
            } else {
                return { status: resultNewDraw.status,
                    payload: { status: resultNewDraw.status,
                        message: `Último concurso ${drawRound} lido da página da Caixa NÂO foi inserido em por causa de: ${resultNewDraw.payload.message}.`
                    }
                }

            }
        } catch (e) {
            console.log('Erro no catch: ' + e)
            return { status: 500, 
                payload: { status: 500,
                    messagem: "Erro inesperado",
                    stack: JSON.stringify(e.message)
                }
            }
        }
    }
}