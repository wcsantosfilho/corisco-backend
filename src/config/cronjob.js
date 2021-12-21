const config = require('./config')
const logger = require('heroku-logger')
const schedule = require('node-schedule')
const fetch = require('node-fetch')
const path = require('path');
const scriptName = path.basename(__filename);

// *    *    *    *    *    *
// ┬    ┬    ┬    ┬    ┬    ┬
// │    │    │    │    │    │
// │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
// │    │    │    │    └───── month (1 - 12)
// │    │    │    └────────── day of month (1 - 31)
// │    │    └─────────────── hour (0 - 23)
// │    └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)
// De hora em hora, do minuto "0" ao minuto "3", no segundo "0" = '0 0-3 * * * *'
const cronVar = config.cronVar;
logger.info(`[cronjob] cronVar: ${cronVar}`)
logger.info(`[cronjob] backendURL: ${config.backendURL}`)
logger.info(`[cronjob] port: ${config.backendPORT}`)
const job = schedule.scheduleJob(cronVar, async function() {
  try {
    logger.info(`[cronjob] executing...`)

    const options = {
      "method": "GET",
      "hostname": config.backendURL,
      "port": config.backendPORT,
      "path": "/api/scrap",
      "headers": {
        "content-type": "application/x-www-form-urlencoded"
      }
    };
    let httpType = config.environment == 'production' ? 'https://': 'http://'
    let urlComplete = config.environment == 'production' ? 
      httpType + options.hostname + options.path : 
      httpType + options.hostname + ':' + options.port + options.path
    const apiResponse = await fetch(urlComplete, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
        }
    })

    logger.info(`[${scriptName}] apiResponse: ${apiResponse.status}`)
    if (apiResponse.status == 200) {
      logger.info(`[${scriptName}] apiResponse: ${JSON.stringify(apiResponse)}`)
      const apiResponseJson = await apiResponse.json()
      logger.info(`[${scriptName}] apiResponseJson: ${JSON.stringify(apiResponseJson)}`)
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

});