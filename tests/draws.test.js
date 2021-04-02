const app = require('../src/loader')
var chai = require('chai')  
const DrawService = require('../src/services/drawService');

var assert = chai.assert;

describe('Teste de DrawService', () => {

    before(function() {
        //Another possibility is to check if mongoose.connection.readyState equals 1
        if (app.db.connection.readyState == 1) {
            return
        }
        app.db.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    })
 
    it('#00 - DrawService - constructor', async function() {
        let draw = new DrawService( new Date(), 0001)
        assert.typeOf(draw.drawDate, 'Date', 'drawDate deveria ser Date')    
        assert.isNumber(draw.drawRound, 'drawRound deveria ser numérico')
        assert.equal(draw.drawRound, 1, 'drawRound deveria ser 1')
    })

    it('#A1 - DrawService - get last draw with empty database', async () => {
        let draw = await new DrawService()
        let resultDraw = await draw.getLastDraw()
        assert.equal(resultDraw.status, 404, 'status deveria ser 404')
        assert.hasAllKeys(resultDraw, ['status', 'payload'], 'result deveria ter as keys status e payload')
    })

    it('#B1 - DrawService - create a new draw', async () => {
        let draw = await new DrawService( new Date(), 0001)
        let resultNewDraw = await draw.NewDraw()
        assert.equal(resultNewDraw.status, 200, 'status deveria ser 200')
        assert.hasAllKeys(resultNewDraw, ['status', 'payload'], 'result deveria ter as keys status e payload')
    })

    it('#B2 - DrawService - create two equal draws', async () => {
        let draw = await new DrawService( new Date(), 1010)
        let resultNewDraw = await draw.NewDraw()
        assert.equal(resultNewDraw.status, 200, 'status deveria ser 200')
        assert.hasAllKeys(resultNewDraw, ['status', 'payload'], 'result deveria ter as keys status e payload')

        let draw2 = await new DrawService( new Date(), 1010)
        let resultNewDraw2 = await draw2.NewDraw()
        assert.equal(resultNewDraw2.status, 422, 'status deveria ser 422')
        assert.hasAllKeys(resultNewDraw2, ['status', 'payload'], 'result deveria ter as keys status e payload')
    })

    it('#C1 - DrawService - get last draw with some records', async () => {
        let draw = await new DrawService()
        let resultDraw = await draw.getLastDraw()
        assert.equal(resultDraw.status, 200, 'status deveria ser 200')
        assert.hasAllKeys(resultDraw, ['status', 'payload'], 'result deveria ter as keys status e payload')
        assert.equal(resultDraw.payload[0].drawRound, 1010, 'último concurso deveria ser o 1010')
    })

    after(function() {
        //Check the database connection. 0 means disconnected / 1 means connected
        if (app.db.connection.readyState == 0) {
            return
        }
        app.db.connection.db.dropDatabase(function(){
            console.log('drop database')
            app.db.connection.close(function(){
              done();
            })
          })
    })

})