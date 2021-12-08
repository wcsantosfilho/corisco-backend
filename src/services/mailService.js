const https = require('https')
const config = require('../config/config')

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
                    console.log(body.toString());
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
        } catch (e) {
            console.log('Erro no catch: ' + e)
            return { status: 500, 
                payload: { status: 500,
                    messagem: "Erro inesperado",
                    stack: JSON.stringify(e.message)
                }
            }
        }
    }
}