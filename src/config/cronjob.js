const config = require('./config')
const logger = require('heroku-logger')
const schedule = require('node-schedule')
const fetch = require('node-fetch')

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
    logger.info(`[cronjob] options: ${JSON.stringify(options,null, 2)}`)
    let httpType = config.environment == 'production' ? 'https://': 'http://'
    logger.info(`[cronjob] httpType: ${httpType}`)
    let urlComplete = httpType + options.hostname + ':' + options.port + options.path
    urlComplete = 'http://viacep.com.br/ws/81010310/json'
    const apiResponse = await fetch(urlComplete, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
        }
      })
    const apiResponseJson = await apiResponse.json()
    console.log(apiResponseJson)
    
  });


