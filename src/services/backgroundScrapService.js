const { data } = require('cheerio/lib/api/attributes');
const { isNumber } = require('lodash');
const puppeteer = require('puppeteer');
const logger = require('heroku-logger')
const path = require('path');
const scriptName = path.basename(__filename);
const fs = require('fs');
const os = require('os');

/* 
 * Esse worker faz a leitura do site de loterias da Caixa para buscar o último concurso realizado
 */

const url = 'http://www.loterias.caixa.gov.br/wps/portal/loterias/landing/megasena';

const jobWorker = async function() {
    try {
        logger.info(`[${scriptName}] backgroudScrapService`)
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
        const xpte = await page.content()
        fs.writeFile("/tmp/lastHtmlPage.html", xpte, function(err) {
            if(err) {
                return console.log(err);
            }
            logger.info(`[${scriptName}] Html file saved: `)
        })
        let dateToday = new Date()
        console.log(dateToday)
        let today = `${dateToday.getFullYear()}-${dateToday.getMonth()+1}-${dateToday.getDate()}${os.EOL}`
        fs.writeFile("/tmp/pageControl.txt", today, { flag: 'a' }, function(err) {
            if(err) {
                return console.log(err);
            }
            logger.info(`[${scriptName}] Control file saved: `)

        })
        await browser.close()
        return { status: 200,
            payload: { status: 200,
            }
        }
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