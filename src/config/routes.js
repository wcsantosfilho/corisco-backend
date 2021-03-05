const express = require('express')
const lotteryRecord = require('../api/lotteryRecord/lotteryRecordService')
const lotteryRoute = require('../api/routes/lotteryRoutes')

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
    router.use('/addBet', lotteryRoute.addBet)
    router.use('/getCurrentBet', lotteryRoute.getCurrentBet)
    router.use('/getBets', lotteryRoute.getBets)
    router.use('/getStatus', lotteryRecord.getStatus)
    router.use('/addDraw', lotteryRecord.addDraw)
    router.use('/checkIfLastBetIsEqualDraw', lotteryRecord.checkIfLastBetIsEqualDraw)
}