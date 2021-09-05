const { modelNames } = require('mongoose')
const ScrapService = require('../../services/scrapService')

/* 
 * Endpoints da API
 * Estes endpoints recebem o request, instanciam o serviço, chamam um método do serviço
 * e enviam o response
 */
/*
 * scrap
 * 
 * scrap Caixa.gov.br lottery webpage
 */
scrap = async (req, res, next) => {
    try {
        // instancia a classe ScrapService
        const scrap = new ScrapService()
        // chama o serviço para buscar o último concurso
        const lastDraw = await scrap.scrapLastDraw()
        // envia como retorno o payload recebido do Service
        res.status(lastDraw.status).send(lastDraw.payload)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = { scrap }