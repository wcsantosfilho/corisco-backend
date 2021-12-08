const express = require('express')
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
        console.log(error)
        res.status(500).json(error)
    }
}

/*
 * sendMail
 * 
 */
sendMail = async (req, res, next) => {
    try{
        var MailService = new mailService();
        var resultMail = await MailService.sendEmail();
        var result = { status: 200,
                payload: { status: 200,
                message: "Email enviado." }
        }
        res.status(result.status).send(result.payload)
        next()
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}


module.exports = { getStatus, sendMail}