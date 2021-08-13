const DrawService = require('./drawService')
const ScrapService = require('./scrapService')

/* drawResultService
 * Esta classe usa métodos de duas outras classes, scrap e draw, para 
 * fazer a leitura do último concurso realizado no site da Caixa e
 * inserir no banco de dados os dados deste concurso (draw)
 */

module.exports = class DrawResultService {
    constructor (drawResultStatus = null) {
        this.drawResultStatus = drawResultStatus
    }

    // insert Draw read from Caixa website
    async readCaixaPageAndInsertDraw() {
        try {
            // instancia a classe ScrapService
            const scrap = new ScrapService()
            // chama o serviço para buscar a última aposta
            resultScrap = await scrap.scrapLastDraw()
            // chama o serviço para buscar o último concurso
            let drawDate = new Date()
            let drawRound = 1010
            // instancia a classe DrawService
            const draw = new DrawService(drawDate, drawRound)
            // chama o serviço para criar uma nova aposta
            const resultNewDraw = await draw.NewDraw()
            // envia como retorno o payload recebido do Service
            res.status(resultNewDraw.status).send(resultNewDraw.payload)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}