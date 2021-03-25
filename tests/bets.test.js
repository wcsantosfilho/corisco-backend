const db = require('../src/config/database')
var chai = require('chai')  
const BetService = require('../src/services/betService')

var assert = chai.assert;

describe('Teste de BetService', () => {
 
    it('#0 - Teste do teste com chai assert', async () => {
        let bet = new BetService( new Date(), 0001, 0001)
        await Promise.resolve()
        assert.equal(3, '3', '== coerces values to strings')
    })

    it('#1 - bet.NewBet()', async () => {
        let bet = await new BetService( new Date(), 0001, 0001)
        var xpto = await bet.NewBet()

        await Promise.resolve()
        assert.equal(xpto.status, 200, 'opa, deu certo!')
    })
})