const db = require('../config/database')
const logger = require('heroku-logger')
const path = require('path');
const scriptName = path.basename(__filename);
const ScrapAndInsertDraw = require('./scrapAndInsertDrawService')

/*
 * Combinação de Scrap + Insert de Draw
 * 
 */
const jobWorker = async function() {
    try {
        // instancia a classe ScrapService
        const combined = new ScrapAndInsertDraw()
        // chama o serviço para buscar o último concurso
        const combination = await combined.readCaixaPageAndInsertDraw()
        // envia como retorno o payload recebido do Service
        logger.info(`[${scriptName}] jobWorker: ${combination.status} | ${JSON.stringify(combination.payload)}`)
        db.disconnect()
    } catch (error) {
        logger.error(`[${scriptName}] Erro no catch: ${error}`)
        return { status: 500, 
            payload: { status: 500,
                messagem: "Erro inesperado",
                stack: JSON.stringify(error.message)
            }
        }
    }
}()

