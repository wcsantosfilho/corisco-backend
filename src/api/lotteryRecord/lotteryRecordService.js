const betRecord = require('./lotteryRecord')

// Endpoints da API
/*
 * addBet
 * 
 * add a Bet to the database
 */
addBet = async (req, res, next) => {
    try {
        const bet = await new betRecord.bets( {...req.body} ).save()
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
        var bet = betRecord.bets
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
        var bet = betRecord.bets
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


module.exports = { addBet, getCurrentBet, getBets, getStatus }