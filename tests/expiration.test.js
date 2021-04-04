const app = require('../src/loader')
var chai = require('chai')  
const BetService = require('../src/services/betService');
const DrawService = require('../src/services/drawService')
const ExpirationService = require('../src/services/expirationService')

var assert = chai.assert;
setTimeout( function() {  
    describe('Teste de ExpirationService', function() {

        before( function() {
            console.log('Expiration: before v')
            console.log(app.db.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}))
            console.log(`readyState: ${app.db.connection.readyState}`)
            console.log('Expirtation: before ^')
        })
    
        it('#00 - BetService - constructor',  async function() {
            let bet = new BetService( new Date(), 0001, 0001)
            assert.typeOf(bet.betDate, 'Date', 'betDate deveria ser Date')    
            assert.isNumber(bet.finalRound, 'finalRound deveria ser numérico')
            assert.isNumber(bet.initialRound, 'finalRound deveria ser numérico')
            assert.equal(bet.initialRound, 1, ' initialRound deveria ser 1')
            assert.equal(bet.finalRound, 1, 'finalRound deveria ser 1')
        })

        it('#00 - DrawService - constructor',  async function() {
            let draw = new DrawService( new Date(), 0001)
            assert.typeOf(draw.drawDate, 'Date', 'drawDate deveria ser Date')    
            assert.isNumber(draw.drawRound, 'drawRound deveria ser numérico')
            assert.equal(draw.drawRound, 1, 'drawRound deveria ser 1')
        })

        it('#00 - ExpirationService - constructor',  async function() {
            let expiration = new ExpirationService(1)
            assert.typeOf(expiration.expirationStatus, 'number', 'expirationStatus deveria ser Integer')   
            assert.isNumber(expiration.expirationStatus, 'expirationStatus deveria ser numérico')
            assert.equal(expiration.expirationStatus, 1, 'expirationStatus deveria ser 1')
        })

        it('#A1 - ExpirationService - get expiration with empty database',  async function() {
            let expiration = new ExpirationService()
            let resultExpiration = await expiration.checkIfLastBetIsEqualDraw()
            assert.equal(expiration.expirationStatus, 999, 'expirationStatus deveria ser 999')
            assert.equal(resultExpiration.status, 404, 'status deveria ser 404')
            assert.hasAllKeys(resultExpiration, ['status', 'payload'], 'result deveria ter as keys status e payload')
        })

        it('#B1a - BetService - create a new bet', async function() {
            let bet = new BetService( new Date(), 0001, 0001)
            let resultNewBet = await bet.NewBet()
            assert.equal(resultNewBet.status, 200, 'status deveria ser 200')
            assert.hasAllKeys(resultNewBet, ['status', 'payload'], 'result deveria ter as keys status e payload')
        })

        it('#B1b - ExpirationService - test expiration without draws', async function() {
            let expiration = new ExpirationService()
            let resultExpiration = await expiration.checkIfLastBetIsEqualDraw()
            assert.equal(expiration.expirationStatus, 999, 'expirationStatus deveria ser 999')
            assert.equal(resultExpiration.status, 404, 'status deveria ser 404')
            assert.hasAllKeys(resultExpiration, ['status', 'payload'], 'result deveria ter as keys status e payload')
        })

        it('#B2a - DrawService - create a new draw', async function() {
            let draw = new DrawService( new Date(), 0001)
            let resultNewDraw = await draw.NewDraw()
            assert.equal(resultNewDraw.status, 200, 'status deveria ser 200')
            assert.hasAllKeys(resultNewDraw, ['status', 'payload'], 'result deveria ter as keys status e payload')
        })

        it('#B2b - ExpirationService - test expiration with bet = draw', async function() {
            let expiration = new ExpirationService()
            let resultExpiration = await expiration.checkIfLastBetIsEqualDraw()
            assert.equal(expiration.expirationStatus, 1, 'expirationStatus deveria ser 1')
            assert.equal(resultExpiration.status, 200, 'status deveria ser 200')
            assert.hasAllKeys(resultExpiration, ['status', 'payload'], 'result deveria ter as keys status e payload')
            assert.equal(resultExpiration.payload.message, 'Sua última aposta 1 já foi sorteada no concurso 1.')
        })

        it('#B3a - DrawService - create a new draw', async function() {
            let draw = new DrawService( new Date(), 0002)
            let resultNewDraw = await draw.NewDraw()
            assert.equal(resultNewDraw.status, 200, 'status deveria ser 200')
            assert.hasAllKeys(resultNewDraw, ['status', 'payload'], 'result deveria ter as keys status e payload')
        })

        it('#B3b - ExpirationService - test expiration with bet < draw', async function() {
            let expiration = new ExpirationService()
            let resultExpiration = await expiration.checkIfLastBetIsEqualDraw()
            assert.equal(expiration.expirationStatus, 3, 'expirationStatus deveria ser 3')
            assert.equal(resultExpiration.status, 200, 'status deveria ser 200')
            assert.hasAllKeys(resultExpiration, ['status', 'payload'], 'result deveria ter as keys status e payload')
            assert.equal(resultExpiration.payload.message, 'Sua última aposta 1 é menor que o concurso atual(2).')
        })

        it('#B4a - BetService - create a new bet', async function() {
            let bet = new BetService( new Date(), 2, 8)
            let resultNewBet = await bet.NewBet()
            assert.equal(resultNewBet.status, 200, 'status deveria ser 200')
            assert.hasAllKeys(resultNewBet, ['status', 'payload'], 'result deveria ter as keys status e payload')
        })

        it('#B4b - ExpirationService - test expiration with bet > draw', async function() {
            let expiration = new ExpirationService()
            let resultExpiration = await expiration.checkIfLastBetIsEqualDraw()
            assert.equal(expiration.expirationStatus, 2, 'expirationStatus deveria ser 2')
            assert.equal(resultExpiration.status, 200, 'status deveria ser 200')
            assert.hasAllKeys(resultExpiration, ['status', 'payload'], 'result deveria ter as keys status e payload')
            assert.equal(resultExpiration.payload.message, 'Sua última aposta 8 é maior que o concurso atual(2).')
        })

        after( function() {
            console.log('Expiration: after v')
            app.db.connection.db.dropDatabase()
            console.log(`readyState: ${app.db.connection.readyState}`)
            console.log('Expiration: after ^')
        })
    })
    run()
}, 5000)    