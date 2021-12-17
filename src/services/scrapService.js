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

const url = 'https://www.w3schools.com/html/html_layout.asp';

 module.exports = class ScrapService {
    constructor (scrapStatus = null) {
        this.scrapStatus = scrapStatus
    }

    // busca dados do ultimo concurso na página web da Caixa Economica Federal
    async scrapLastDraw() {
        try {
            logger.info(`[${scriptName}] scrapLastDraw`)
            const browser = await puppeteer.launch(
                { args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage',
                    '--single-process'
                ], 
                headless: true }
            )
            const page = await browser.newPage()
            await page.goto(url)
            await page.waitForSelector('.color_h1')

            var agaHum = await page.evaluate( () => {
                let results = []
                let items = document.querySelectorAll('h1')
                items.forEach((item) => {
                    console.log(`[item] ${item.innerText}`)
                    results.push({
                        text: item.innerText
                    })
                })
                return results
            }) 
            await browser.close()
            logger.info(`[agaHum] ${agaHum[0].text}`)

            return { status: 200,
                payload: { status: 200,
                    xpto: agaHum[0].text
                }
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