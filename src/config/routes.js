const express = require('express')
const betRoutes = require('../api/routes/betRoutes')
const drawRoutes = require('../api/routes/drawRoutes')
const genericRoutes = require('../api/routes/genericRoutes')
const expirationRoutes = require('../api/routes/expirationRoutes')
const scrapRoutes = require('../api/routes/scrapRoutes')
const scrapAndInsertDraw = require('../api/routes/scrapAndInsertDrawRoutes')

module.exports = function(server) {
    /*
     * Define base URL to all routes
     * Definir URL base para todas as rotas
     */
    const router = express.Router()
    server.use('/api', router)

    /*
     * The endpoints below stay under /api/ and are defined in route files
     */
    router.use('/addBet', betRoutes.addBet)
    router.use('/getCurrentBet', betRoutes.getCurrentBet)
    router.use('/getBets', betRoutes.getBets)
    router.use('/getStatus', genericRoutes.getStatus)
    router.use('/addDraw', drawRoutes.addDraw)
    router.use('/checkIfLastBetIsEqualDraw', expirationRoutes.checkIfLastBetIsEqualDraw)
    router.use('/scrap', scrapRoutes.scrap)
    router.use('/scrapAndInsertDraw', scrapAndInsertDraw.combined)
}