const app = require('../src/loader')

var chai = require('chai')  
const BetService = require('../src/services/betService');
const { expect } = require('chai');

var assert = chai.assert;

describe('Teste de BetService', () => {

    before(function() {
        //Another possibility is to check if mongoose.connection.readyState equals 1
        if (app.db.connection.readyState == 1) {
            return
        }
        app.db.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    })
 
    it('#0 - Teste do teste com chai assert', async function() {
        const bet = new BetService( new Date(), 0001, 0001)
        expect(bet.finalRound).to.equal(1)
    })

    it('#1 - bet.NewBet()', async () => {
        const bet2 = await new BetService( new Date(), 0001, 0001)
        const resultNewBet = await bet2.NewBet()
        expect(bet2.finalRound).to.equal(1)
        assert.equal(resultNewBet.status, 200, 'opa, deu certo!')
    })

    after(function() {
        //Check the database connection. 0 means disconnected / 1 means connected
        if (app.db.connection.readyState == 0) {
            return
        }
        app.db.connection.close()
    })

})