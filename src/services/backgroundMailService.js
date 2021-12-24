const db = require('../config/database')
const https = require('https')
const config = require('../config/config')
const logger = require('heroku-logger')
const path = require('path');
const scriptName = path.basename(__filename);
const Expiration = require('./expirationService')

// envia template de e-mail pelo Twillio/Sendgrid
const jobWorker = async function() {
    try {
        logger.info(`[${scriptName}] sendEmail`)
        // instancia a classe Expiration
        const expiration = new Expiration()
        // chama o serviço para buscar o último concurso
        const validation = await expiration.checkIfLastBetIsEqualDraw()
        if (validation.status == 200) {
            var msgEmail = validation.payload.message
        }  else {
            var msgEmail = 'não há confirmação'
        }


        var options = {
            "method": "POST",
            "hostname": "api.sendgrid.com",
            "port": null,
            "path": "/v3/mail/send",
            "headers": {
            "authorization": `Bearer ${config.sendgridApiKey}`,
            "content-type": "application/json"
            }
        };

        var req = https.request(options, function (res) {
            var chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });

            res.on("end", function () {
                var body = Buffer.concat(chunks);
                logger.info(`[${scriptName}] ${body.toString()}`);
            });
        });

        req.write(JSON.stringify({ personalizations: 
            [ { to: [ { email: 'wcsantosfilho@gmail.com', name: 'Walter Santos Filho' } ],
                dynamic_template_data: { first_name: 'Walter', expirationMessage: msgEmail },
                subject: msgEmail } ],
            from: { email: 'wcsantosfilho@gmail.com', name: 'Walter Santos Filho' },
            reply_to: { email: 'wcsantosfilho@gmail.com', name: 'Walter Santos Filho' },
            template_id: 'd-8e3c4b535350446b92481a8a5f2fc976' }));
        req.end();
        db.disconnect()
    } catch (error) {
        logger.error('Erro no catch: ' + error)
        return { status: 500, 
            payload: { status: 500,
                messagem: "Erro inesperado",
                stack: JSON.stringify(error.message)
            }
        }
    }
}()