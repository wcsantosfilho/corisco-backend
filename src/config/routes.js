const express = require('express')
const lotteryRecord = require('../api/lotteryRecord/lotteryRecordService')

module.exports = function(server) {
    /*
     * Define base URL to all routes
     * Definir URL base para todas as rotas
     */
    const router = express.Router()
    server.use('/api', router)

    /*
     * The endpoints below stay under /api/ and are defined in lotteryRecordService.js
     */
    router.use('/addBet', lotteryRecord.addBet)
    router.use('/getCurrentBet', lotteryRecord.getCurrentBet)
    router.use('/getBets', lotteryRecord.getBets)
    router.use('/getStatus', lotteryRecord.getStatus)
    //router.use('/addDraw', lotteryRecord.addDraw)
}