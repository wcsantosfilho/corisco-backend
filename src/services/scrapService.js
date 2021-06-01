const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

/* scrapService
 * Esta classe faz a leitura do site de loterias da Caixa para buscar o último concurso realizado
 */

const url = 'http://www.loterias.caixa.gov.br/wps/portal/loterias/landing/megasena';
//const url = 'http://books.toscrape.com/'


 module.exports = class ScrapService {
    constructor (scrapStatus = null) {
        this.scrapStatus = scrapStatus
    }

    // last bet is equal last draw?
    async scrapLastDraw() {
        try {
            console.log('launching browser...')
            const browser = await puppeteer.launch()
            console.log('new page...')
            const page = await browser.newPage()
            console.log('go to...' + url)
            await page.goto(url)
            console.log('waitForSelector...')
            await page.waitForSelector('#conteudoresultado')
            console.log('title...' + page._target._targetInfo.title)
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
            var drawText = agaDois.filter( (item) => {
                // Look for "Resultado Concurso"
                let pattern = /Resultado Concurso/g;
                return pattern.test(item.text);
            })
            console.log('XPTO: ', drawText)

            return { status: 200,
                payload: drawText 
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