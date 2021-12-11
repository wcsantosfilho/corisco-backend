const cheerio = require('cheerio');
const { data } = require('cheerio/lib/api/attributes');
const { isNumber } = require('lodash');
const puppeteer = require('puppeteer');
const logger = require('heroku-logger')
const path = require('path');
const scriptName = path.basename(__filename);

/* scrapService
 * Esta classe faz a leitura do site de loterias da Caixa para buscar o último concurso realizado
 */

const url = 'http://www.loterias.caixa.gov.br/wps/portal/loterias/landing/megasena';

 module.exports = class ScrapService {
    constructor (scrapStatus = null) {
        this.scrapStatus = scrapStatus
    }

    // busca dados do ultimo concurso na página web da Caixa Economica Federal
    async scrapLastDraw() {
        try {
            logger.info(`[${scriptName}] scrapLastDraw`)
            const browser = await puppeteer.launch(
                { args: ['--disable-gpu','--disable-dev-shm-usage','--no-sandbox','--disable-setuid-sandbox'], 
                headless: true }
            )
            const page = await browser.newPage()
            await page.goto(url)
            await page.waitForSelector('#conteudoresultado')
            let agaDois = await page.evaluate( () => {
                let results = []
                let items = document.querySelectorAll('h2')
                items.forEach((item) => {
                    results.push({
                        text: item.innerText
                    })
                })
                return results
            })
            await browser.close()
            var drawNumberInPage = agaDois.filter( (item) => {
                // Look for "Resultado Concurso"
                let pattern = /Resultado Concurso/g
                return pattern.test(item.text)
            })
            let pattern = /Resultado Concurso (\d+) \((\d{1,2})\/(\d{1,2})\/(\d{2,4})\)/g
            var dataExtracted = pattern.exec(drawNumberInPage[0].text)
            if (dataExtracted == null ) {
                throw "No draw read at all"
            }
            let lastDraw = isNaN(parseInt(dataExtracted[1])) ? null : parseInt(dataExtracted[1])
            let dayLastDraw = isNaN(parseInt(dataExtracted[2])) ? null : parseInt(dataExtracted[2])
            let monthLastDraw = isNaN(parseInt(dataExtracted[3])) ? null : parseInt(dataExtracted[3])
            let yearLastDraw = isNaN(parseInt(dataExtracted[4])) ? null : parseInt(dataExtracted[4])
            let textInCaixaWebPage = dataExtracted[0]
            if (lastDraw == null || dayLastDraw == null || monthLastDraw == null || yearLastDraw == null) {
                throw "Problem in scrap"
            }
            logger.info(`[${scriptName}] scrapLastDraw ${lastDraw}`)

            return { status: 200,
                payload: { status: 200,
                    lastDraw: lastDraw,
                    dayLastDraw: dayLastDraw,
                    monthLastDraw: monthLastDraw,
                    yearLastDraw: yearLastDraw,
                    textInCaixaWebPage: textInCaixaWebPage }
            }
        } catch (error) {
            logger.error('Erro no catch: ' + error)
            return { status: 500, 
                payload: { status: 500,
                    messagem: "Erro inesperado",
                    stack: JSON.stringify(error.message)
                }
            }
        }
    }
}