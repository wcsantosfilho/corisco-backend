const express = require('express')
const DrawService = require('../../services/drawService')


/* 
 * Endpoints da API
 * Estes endpoints recebem o request, instanciam o serviço, chamam um método do serviço
 * e enviam o response
 */

/*
 * addDraw
 * 
 * add a new draw
 */
addDraw = async (req, res, next) => {
    try {
        // destruct do que interessa do 'req.body'
        var { drawDate, drawRound } = req.body
        // instancia a classe DrawService
        const draw = new DrawService(drawDate, drawRound)
        // chama o serviço para criar uma nova aposta
        const resultNewDraw = await draw.NewDraw()
        // envia como retorno o payload recebido do Service
        res.status(resultNewDraw.status).send(resultNewDraw.payload)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = { addDraw }