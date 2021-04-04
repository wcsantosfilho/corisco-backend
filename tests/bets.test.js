const app = require('../src/loader')
var chai = require('chai')  
const BetService = require('../src/services/betService');

var assert = chai.assert;
setTimeout( function() {  
    describe('Teste de BetService', function() {

        before( function() {
            console.log('Bet: before v')
            console.log(app.db.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}))
            console.log(`readyState: ${app.db.connection.readyState}`)
            console.log('Bet: before ^')
        })
    
        it('#00 - BetService - constructor', async function() {
            let bet = new BetService( new Date(), 0001, 0001)
            assert.typeOf(bet.betDate, 'Date', 'betDate deveria ser Date')    
            assert.isNumber(bet.finalRound, 'finalRound deveria ser numérico')
            assert.isNumber(bet.initialRound, 'finalRound deveria ser numérico')
            assert.equal(bet.initialRound, 1, ' initialRound deveria ser 1')
            assert.equal(bet.finalRound, 1, 'finalRound deveria ser 1')
        })

        it('#A1 - BetService - get last bet with empty database', async function() {
            let bet = new BetService()
            let resultBet = await bet.getLastBet()
            assert.equal(resultBet.status, 404, 'status deveria ser 404')
            assert.hasAllKeys(resultBet, ['status', 'payload'], 'result deveria ter as keys status e payload')
        })

        it('#A2 - BetService - get all bets with empty database', async function() {
            let bet = new BetService()
            let resultBet = await bet.getBets()
            assert.equal(resultBet.status, 404, 'status deveria ser 404')
            assert.hasAllKeys(resultBet, ['status', 'payload'], 'result deveria ter as keys status e payload')
        })

        it('#B1 - BetService - create a new bet', async function() {
            let bet = new BetService( new Date(), 0001, 0001)
            let resultNewBet = await bet.NewBet()
            assert.equal(resultNewBet.status, 200, 'status deveria ser 200')
            assert.hasAllKeys(resultNewBet, ['status', 'payload'], 'result deveria ter as keys status e payload')
        })

        it('#B2 - BetService - create two equal bets', async function() {
            let bet = new BetService( new Date(), 1010, 1010)
            let resultNewBet = await bet.NewBet()
            assert.equal(resultNewBet.status, 200, 'status deveria ser 200')
            assert.hasAllKeys(resultNewBet, ['status', 'payload'], 'result deveria ter as keys status e payload')

            let bet2 = new BetService( new Date(), 1010, 1010)
            let resultNewBet2 = await bet2.NewBet()
            assert.equal(resultNewBet2.status, 422, 'status deveria ser 422')
            assert.hasAllKeys(resultNewBet2, ['status', 'payload'], 'result deveria ter as keys status e payload')
        })

        it('#C1 - BetService - get last bet with some records', async function() {
            let bet = new BetService()
            let resultBet = await bet.getLastBet()
            assert.equal(resultBet.status, 200, 'status deveria ser 200')
            assert.hasAllKeys(resultBet, ['status', 'payload'], 'result deveria ter as keys status e payload')
            assert.equal(resultBet.payload[0].finalRound, 1010, 'última aposta deveria ser a 1010')
        })

        it('#C1 - BetService - get all bets with some records', async function() {
            let bet = new BetService()
            let resultBet = await bet.getBets()
            assert.equal(resultBet.status, 200, 'status deveria ser 200')
            assert.hasAllKeys(resultBet, ['status', 'payload'], 'result deveria ter as keys status e payload')
            assert.typeOf(resultBet.payload[0].betDate, 'Date', 'payload[0].betDate deveria ser uma data')
            assert.equal(resultBet.payload[0].initialRound, 1, 'payload[0].initialRound deveria ser 1')
            assert.equal(resultBet.payload[0].finalRound, 1, 'payload[0].finalRound deveria ser 1')
            assert.typeOf(resultBet.payload[1].betDate, 'Date', 'payload[1].betDate deveria ser uma data')
            assert.equal(resultBet.payload[1].initialRound, 1010, 'payload[1].initialRound deveria ser 1010')
            assert.equal(resultBet.payload[1].finalRound, 1010, 'payload[1].finalRound deveria ser 1010')
        })

        after(function() {
            console.log('Bet: after v')
            app.db.connection.db.dropDatabase()
            console.log(`readyState: ${app.db.connection.readyState}`)
            console.log('Bet: after ^')
        })
    })
    run()
}, 5000)