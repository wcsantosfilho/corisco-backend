const config = require('./config')
const schedule = require('node-schedule')
const https = require('https')

// *    *    *    *    *    *
// ┬    ┬    ┬    ┬    ┬    ┬
// │    │    │    │    │    │
// │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
// │    │    │    │    └───── month (1 - 12)
// │    │    │    └────────── day of month (1 - 31)
// │    │    └─────────────── hour (0 - 23)
// │    └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)
// De hora em hora, do minuto "0" ao minuto "3", no segundo "0" = '0 0-3 * * * *'
const cronVar = config.cronVar;
console.log('[cronjob]'+'cronVar: '+cronVar)
console.log('[cronjob]'+'backendURL: '+config.backendURL)
console.log('[cronjob]'+'port:'+config.backendPORT)
const job = schedule.scheduleJob(cronVar, async function() {
    console.log('The answer to life, the universe, and everything! ');


    const options = {
      "method": "GET",
      "hostname": config.backendURL,
      "port": config.backendPORT,
      "path": "/api/scrapAndInsertDraw",
      "headers": {
        "content-type": "application/x-www-form-urlencoded"
      }
    };

    const req = https.request(options, res => {
      console.log(`[cronjob] statusCode: ${res.statusCode}`)
    
      res.on('data', d => {
        process.stdout.write(d)
        })
    })
    
    req.on('error', error => {
      console.error(error)
    })
    
    req.end()
  });


// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

// const sgMail = require('@sendgrid/mail')
// sgMail.setApiKey(config.sendgridApiKey)
// const msg = {
//   to: 'walter.filho@bcredi.com.br', // Change to your recipient
//   from: 'wcsantosfilho@gmail.com', // Change to your verified sender
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// }
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent')
//   })
//   .catch((error) => {
//     console.error(error)
//   })


  // var http = require("https");

  // var options = {
  //   "method": "POST",
  //   "hostname": "api.sendgrid.com",
  //   "port": null,
  //   "path": "/v3/mail/send",
  //   "headers": {
  //     "authorization": `Bearer ${config.sendgridApiKey}`,
  //     "content-type": "application/json"
  //   }
  // };
  
  // var req = http.request(options, function (res) {
  //   var chunks = [];
  
  //   res.on("data", function (chunk) {
  //     chunks.push(chunk);
  //   });
  
  //   res.on("end", function () {
  //     var body = Buffer.concat(chunks);
  //     console.log(body.toString());
  //   });
  // });
  
  // req.write(JSON.stringify({ personalizations: 
  //    [ { to: [ { email: 'wcsantosfilho@gmail.com', name: 'Walter Santos Filho' } ],
  //        dynamic_template_data: { first_name: 'Xico', adjective: '', noun: '', currentDayofWeek: '' },
  //        subject: 'Hello, World!' } ],
  //   from: { email: 'wcsantosfilho@gmail.com', name: 'Walter Santos Filho' },
  //   reply_to: { email: 'wcsantosfilho@gmail.com', name: 'Walter Santos Filho' },
  //   template_id: 'd-8e3c4b535350446b92481a8a5f2fc976' }));
  // req.end();