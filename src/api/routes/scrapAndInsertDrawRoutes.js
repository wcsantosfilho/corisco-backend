const { modelNames } = require('mongoose')
const ScrapAndInsertDraw = require('../../services/scrapAndInsertDrawService')

/* 
 * Endpoints da API
 * Estes endpoints recebem o request, instanciam o serviço, chamam um método do serviço
 * e enviam o response
 */
/*
 * Combinação de Scrap + Insert de Draw
 * 
 * 
 */
combined = async (req, res, next) => {
    try {
        // instancia a classe ScrapService
        const combined = new ScrapAndInsertDraw()
        console.log('[scrapAndInsertDrawRoute] depois de instanciar ScrapAndInsertDraw ', combined, '\n')
        // chama o serviço para buscar o último concurso
        const combination = await combined.readCaixaPageAndInsertDraw()
        console.log('[scrapAndInsertDrawRoute] depois de chamar readCaixa... ', combination, '\n')
        // envia como retorno o payload recebido do Service
        res.status(combination.status).send(combination.payload)
        next()
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = { combined }