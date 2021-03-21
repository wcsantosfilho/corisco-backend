const express = require('express')
const lotteryRecord = require('../api/lotteryRecord/lotteryRecordService')
const betRoute = require('../api/routes/betRoutes')
const drawRoute = require('../api/routes/drawRoutes')
const genericRoute = require('../api/routes/genericRoutes')

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
    router.use('/addBet', betRoute.addBet)
    router.use('/getCurrentBet', betRoute.getCurrentBet)
    router.use('/getBets', betRoute.getBets)
    router.use('/getStatus', genericRoute.getStatus)
    router.use('/addDraw', drawRoute.addDraw)
    router.use('/checkIfLastBetIsEqualDraw', lotteryRecord.checkIfLastBetIsEqualDraw)
}