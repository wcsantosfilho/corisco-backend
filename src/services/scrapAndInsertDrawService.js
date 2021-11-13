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
        this.xpto = 'XPTO'
    }

    // insert Draw read from Caixa website
    async readCaixaPageAndInsertDraw() {
        try {
            // instancia a classe ScrapService
            const scrap = new ScrapService()
            console.log('[ScranpAndInserDrawSercice] '+'**instancia class ScrapService')
            console.log('[ScranpAndInserDrawSercice] '+scrap.xpto)
            // chama o serviço para buscar a última aposta
            console.log('[ScranpAndInserDrawSercice] '+'**antes do scrapLastDraw')
            const resultScrap = await scrap.scrapLastDraw()
            if (resultScrap.status != 200) {
                throw "Problema no scrap"
            }
            console.log('[ScranpAndInserDrawSercice] '+'**depois do scrapLastDraw')
            let yearLastDraw = resultScrap.payload.yearLastDraw
            let monthLastDraw = resultScrap.payload.monthLastDraw - 1
            let dayLastDraw = resultScrap.payload.dayLastDraw
            let drawDate = new Date(yearLastDraw, monthLastDraw, dayLastDraw)
            let drawRound = resultScrap.payload.lastDraw
            console.log('[ScranpAndInserDrawSercice] '+drawRound)
            // instancia a classe DrawService
            const draw = new DrawService(drawDate, drawRound)
            console.log('[ScranpAndInserDrawSercice] '+draw.drawDate+'|'+draw.drawRound)
            // chama o serviço para criar uma nova aposta
            const resultNewDraw = await draw.NewDraw()
            // envia como retorno o payload recebido do Service
            console.log('[ScranpAndInserDrawSercice] '+'**depois no draw.NewDraw')
            console.log('[ScranpAndInserDrawSercice] '+resultNewDraw.status)
            if (resultNewDraw != null && resultNewDraw.status == 200) {
                console.log('[ScranpAndInserDrawSercice] '+'not null && == 200')

                return { status: 200,
                    payload: { status: 200,
                        message: `Último concurso ${drawRound} lido da página da Caixa foi inserido em ${resultNewDraw.payload.drawDate} e ${resultNewDraw.payload.drawRound}.`
                    }
                }
            } else {
                console.log('[ScranpAndInserDrawSercice] '+'null || != 200')
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