const express = require('express')
const logger = require('heroku-logger')
const mailService = require('../../services/mailService')

/*
 * getStatus
 * 
 * dummy endpoint
 */
getStatus = async (req, res, next) => {
    try{
        var result = { status: 200,
                payload: { status: 200,
                message: "Toda forma de poder e uma forma de viver por nada." }
        }
        res.status(result.status).send(result.payload)
        next()
    } catch (error) {
        logger.error(error)
        res.status(500).json(error)
    }
}

module.exports = { getStatus }