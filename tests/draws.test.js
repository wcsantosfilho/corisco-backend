const app = require('../src/loader')
var chai = require('chai')  
const DrawService = require('../src/services/drawService')

var assert = chai.assert
setTimeout( function() {  
    describe('Teste de DrawService', function() {

        before( function() {
            console.log('Draw: before v')
            console.log(app.db.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}))
            console.log(`readyState: ${app.db.connection.readyState}`)
            console.log('Draw: before ^')
        })
    
        it('#00 - DrawService - constructor', async function() {
            let draw = new DrawService( new Date(), 0001)
            assert.typeOf(draw.drawDate, 'Date', 'drawDate deveria ser Date')    
            assert.isNumber(draw.drawRound, 'drawRound deveria ser numérico')
            assert.equal(draw.drawRound, 1, 'drawRound deveria ser 1')
        })

        it('#A1 - DrawService - get last draw with empty database', async function() {
            let draw = new DrawService()
            let resultDraw = await draw.getLastDraw()
            assert.equal(resultDraw.status, 404, 'status deveria ser 404')
            assert.hasAllKeys(resultDraw, ['status', 'payload'], 'result deveria ter as keys status e payload')
        })

        it('#B1 - DrawService - create a new draw', async function() {
            let draw = new DrawService( new Date(), 0001)
            let resultNewDraw = await draw.NewDraw()
            assert.equal(resultNewDraw.status, 200, 'status deveria ser 200')
            assert.hasAllKeys(resultNewDraw, ['status', 'payload'], 'result deveria ter as keys status e payload')
        })

        it('#B2 - DrawService - create two equal draws', async function() {
            let draw = new DrawService( new Date(), 1010)
            let resultNewDraw = await draw.NewDraw()
            assert.equal(resultNewDraw.status, 200, 'status deveria ser 200')
            assert.hasAllKeys(resultNewDraw, ['status', 'payload'], 'result deveria ter as keys status e payload')

            let draw2 = new DrawService( new Date(), 1010)
            let resultNewDraw2 = await draw2.NewDraw()
            assert.equal(resultNewDraw2.status, 422, 'status deveria ser 422')
            assert.hasAllKeys(resultNewDraw2, ['status', 'payload'], 'result deveria ter as keys status e payload')
        })

        it('#C1 - DrawService - get last draw with some records', async function() {
            let draw = new DrawService()
            let resultDraw = await draw.getLastDraw()
            assert.equal(resultDraw.status, 200, 'status deveria ser 200')
            assert.hasAllKeys(resultDraw, ['status', 'payload'], 'result deveria ter as keys status e payload')
            assert.equal(resultDraw.payload[0].drawRound, 1010, 'último concurso deveria ser o 1010')
        })

        after( function() {
            console.log('Draw: after v')
            app.db.connection.db.dropDatabase()
            console.log(`readyState: ${app.db.connection.readyState}`)
            console.log('Draw: after ^')
        })
    })
    run()
}, 5000)