const https = require('https')
const config = require('../config/config')
const logger = require('heroku-logger')
const path = require('path');
const scriptName = path.basename(__filename);

/* mailService
 * Esta classe envia e-mails pelo serviço do Sendgrid
 */

 module.exports = class MailService {
    constructor (mailStatus = null) {
        this.mailStatus = mailStatus
    }

    // envia template de e-mail pelo Twillio/Sendgrid
    async sendEmail() {
        try {
            logger.info(`[${scriptName}] sendEmail`)
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
                    dynamic_template_data: { first_name: 'Xico', adjective: '', noun: '', currentDayofWeek: '' },
                    subject: 'Hello, World!' } ],
                from: { email: 'wcsantosfilho@gmail.com', name: 'Walter Santos Filho' },
                reply_to: { email: 'wcsantosfilho@gmail.com', name: 'Walter Santos Filho' },
                template_id: 'd-8e3c4b535350446b92481a8a5f2fc976' }));
            req.end();
        } catch (error) {
            logger.error('Erro no catch: ' + error)
            return { status: 500, 
                payload: { status: 500,
                    messagem: "Erro inesperado",
                    stack: JSON.stringify(error.message)
                }
            }
        }
    }
}