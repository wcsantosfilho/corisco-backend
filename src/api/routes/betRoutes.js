const express = require('express')
const logger = require('heroku-logger')
const BetService = require('../../services/betService')

/* 
 * Endpoints da API
 * Estes endpoints recebem o request, instanciam o serviço, chamam um método do serviço
 * e enviam o response
 */

/*
 * addBet
 * 
 * add a new bet
 */
addBet = async (req, res, next) => {
    try {
        // destruct do que interessa do 'req.body'
        var { betDate, initialRound, finalRound } = req.body
        // instancia a classe BetService
        const bet = new BetService(betDate, initialRound, finalRound)
        // chama o serviço para criar uma nova aposta
        const resultNewBet = await bet.NewBet()
        // envia como retorno o payload recebido do Service
        res.status(resultNewBet.status).send(resultNewBet.payload)
    } catch (error) {
        logger.error(error)
        res.status(500).json(error)
    }
}

/*
 * getCurrentBet
 * 
 * get the most recent bet
 */
getCurrentBet = async (req, res, next) => {
    try{
        // instancia a class BetService
        const bet = new BetService()
        // chama o serviço para buscar a última aposta
        var resultLastBet = await bet.getLastBet()
        // envia como retorno o payload recebido do Service
        res.status(resultLastBet.status).send(resultLastBet.payload)
        next()
    } catch (error) {
        logger.error(error)
        res.status(500).json(error)
    }
}

/*
 * getBets
 * 
 * list all bets
 */
getBets = async (req, res, next) => {
    try{
        // instancia a class BetService
        const bet = new BetService()
        // chama o serviço para buscar todas as apostas
        var resultBets = await bet.getBets()
        // envia como retorno o payload recebido do Service
        res.status(resultBets.status).send(resultBets.payload)
        next()
    } catch (error) {
        logger.error(error)
        res.status(500).json(error)
    }
}


module.exports = { addBet, getCurrentBet, getBets }