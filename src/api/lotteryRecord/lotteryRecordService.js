const myRecords = require('../../models/lotteryModel')

/*
 * ESTE ARQUIVO SERÁ ALTERADO PARA ARQUIVOS SEPARADOS NA PASTA ROUTES
 */

// Endpoints da API


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
        var draw = myRecords.draws
        var lastDraw = await draw.find().limit(1).sort( { drawRound: -1 })

        var statusCode = 0
        var responseObject
        if (lastDraw.length == 0 || lastBet.length == 0) {
            statusCode = 404
            responseObject = { responseCode: statusCode, 
                mensagem: 'Aposta e/ou Concurso não encontrados.' 
            }
        } else {
            var lastBetRound = lastBet[0].finalRound
            var lastDrawRound = lastDraw[0].drawRound
            if (lastBetRound == lastDrawRound || lastBetRound <= lastDrawRound) {
                statusCode = 200
                responseObject = { responseCode: statusCode, 
                    mensagem: `Você não tem aposta para o próximo concurso: Última aposta: ${lastBetRound}, último concurso: ${lastDrawRound}.` 
                }
            } else {
                statusCode = 200
                responseObject = { responseCode: statusCode, 
                    mensagem: `Tudo certo. Sua última aposta: ${lastBetRound}, último concurso: ${lastDrawRound}.` 
                }
            }
        }
        res.status(statusCode).send(responseObject)
        next()
    } catch (error) {
        console.log('Erro encontrado: ' + error)
        res.status(500).json(error)
    }
}


module.exports = { getStatus, addDraw, checkIfLastBetIsEqualDraw }