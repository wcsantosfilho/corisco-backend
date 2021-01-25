const myRecords = require('./lotteryRecord')

// Endpoints da API
/*
 * addBet
 * 
 * add a Bet to the database
 */
addBet = async (req, res, next) => {
    try {
        const bet = await new myRecords.bets( {...req.body} ).save()
        res.send(bet)
    } catch (error) {
        console.log('Erro encontrado: ' + error)
        res.status(422).json(error)
    }
}

/*
 * getCurrentBet
 * 
 * get the most recent Bet
 */
getCurrentBet = async (req, res, next) => {
    try{
        var bet = myRecords.bets
        var result = await bet.find().limit(1).sort( { finalRound: -1 })
        res.status(200).send(result[0])
        next()
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

/*
 * getBets
 * 
 * List all bets
 */
getBets = async (req, res, next) => {
    try{
        var bet = myRecords.bets
        var result = await bet.find().sort( { finalRound: -1 })
        res.status(200).send(result)
        next()
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

/*
 * getStatus
 * 
 * dummy endpoint
 */
getStatus = async (req, res, next) => {
    try{
        var result = "Toda forma de poder e uma forma de viver por nada."
        res.status(200).send(result)
        next()
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

/*
 * addDraw
 * 
 * add a Draw to the database
 */
addDraw = async (req, res, next) => {
    try {
        const draw = await new myRecords.draws( {...req.body} ).save()
        res.send(draw)
    } catch (error) {
        console.log('Erro encontrado: ' + error)
        res.status(422).json(error)
    }
}

/*
 * checkIfLastBetIsEqualDraw
 * 
 * check if a last Draw is equal than last Bet, i.e., there is no valid Bet to a run in a Draw
 */
checkIfLastBetIsEqualDraw = async (req, res, next) => {
    try {
        var bet = myRecords.bets
        var lastBet = await bet.find().limit(1).sort( { finalRound: -1 })
        var lastBetRound = lastBet[0].finalRound

        var draw = myRecords.draws
        var lastDraw = await draw.find().limit(1).sort( { drawRound: -1 })
        var lastDrawRound = lastDraw[0].drawRound

        if (lastBetRound == lastDrawRound) {
            var result = `Oh,oh... last Bet ${lastBetRound} = last Draw ${lastDrawRound}.`
        } else {
            var result = `Don't worry. Last Bet ${lastBetRound} <> last Draw ${lastDrawRound}.`
        }
        res.status(200).send(result)
    } catch (error) {
        console.log('Erro encontrado: ' + error)
        res.status(500).json(error)
    }
}


module.exports = { addBet, getCurrentBet, getBets, getStatus, addDraw, checkIfLastBetIsEqualDraw }