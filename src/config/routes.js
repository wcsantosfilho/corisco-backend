const express = require('express')
const betRecords = require('../api/betRecord/betRecordService')

module.exports = function(server) {
    /*
     * Define base URL to all routes
     * Definir URL base para todas as rotas
     */
    const router = express.Router()
    server.use('/api', router)

    /*
     * The endpoints below stay under /api/ and are defined in betRecordService.js
     */
    router.use('/addBet', betRecords.addBet)
    router.use('/getCurrentBet', betRecords.getCurrentBet)
    router.use('/getBets', betRecords.getBets)
    router.use('/getStatus', betRecords.getStatus)

}