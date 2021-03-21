const express = require('express')
const ExpirationService = require('../../services/expirationService')


/* 
 * Endpoints da API
 * Estes endpoints recebem o request, instanciam o serviço, chamam um método do serviço
 * e enviam o response
 */

/* checkIfLastBetIsEqualDraw
 * 
 * check if a last Draw is equal than last Bet, i.e., there is no valid Bet to a run in the next Draw
 *
 */
checkIfLastBetIsEqualDraw = async (req, res, next) => {
    try {
        // instancia a classe expirationService
        const expiration = new ExpirationService()
        // chama o serviço para verificar aposta vs concurso
        const result = await expiration.checkIfLastBetIsEqualDraw()
        // envia como retorno o payload recebido do Service
        res.status(result.status).send(result.payload)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = { checkIfLastBetIsEqualDraw }