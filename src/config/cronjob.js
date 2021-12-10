const config = require('./config')
const logger = require('heroku-logger')
const schedule = require('node-schedule')
const https = require('https')

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
      "path": "/api/scrapAndInsertDraw",
      "headers": {
        "content-type": "application/x-www-form-urlencoded"
      }
    };

    const req = https.request(options, res => {
      logger.info(`[cronjob] statusCode: ${res.statusCode}`)
    
      res.on('data', d => {
        logger.info(`[cronjob] data: ${d}`)
        })
    })
    
    req.on('error', error => {
      logger.error(error)
    })
    
    req.end()
  });


