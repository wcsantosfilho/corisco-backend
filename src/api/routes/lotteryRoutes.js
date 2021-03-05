const express = require('express')
const LotteryService = require('../../services/LotteryService')

// Endpoints da API
/*
 * addBet
 * 
 * add a Bet to the database
 */
addBet = async (req, res, next) => {
    try {
        // destruct do que interessa do 'req.body'
        var { betDate, initialRound, finalRound } = req.body
        // instancia a classe LotteryService
        const bet = new LotteryService(betDate, initialRound, finalRound)
        // chama o serviço para criar uma nova aposta
        await bet.NewBet()
        // envia como retorno o objeto 'bet' -> Poderia ser um retorno mais elaborado???
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
        const bet = new LotteryService()
        var result = await bet.getLastBet()
        var statusCode = 0
        var responseJson
        if (result.length == 0) {
            statusCode = 404
            responseJson = { responsecode: statusCode, erro: 'Nenhuma aposta encontrada'}
        } else if (result.length > 0) {
            statusCode = 200
            responseJson = result[0]
        }
        res.status(statusCode).send(responseJson)
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
        const bet = new LotteryService()
        var result = await bet.getBets()
        var statusCode = 0
        var responseJson
        if (result.length == 0) {
            statusCode = 404
            responseJson = { responsecode: statusCode, erro: 'Nenhuma aposta encontrada'}
        } else if (result.length > 0) {
            statusCode = 200
            responseJson = result
        }
        res.status(statusCode).send(responseJson)
        next()
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}


module.exports = { addBet, getCurrentBet, getBets }