const schedule = require('node-schedule')

const job = schedule.scheduleJob('* * * 1 * *', function(){
    console.log('The answer to life, the universe, and everything!');
  });


// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

// const sgMail = require('@sendgrid/mail')
// sgMail.setApiKey(process.env.SENDGRID_API_KEY)
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


  var http = require("https");

  var options = {
    "method": "POST",
    "hostname": "api.sendgrid.com",
    "port": null,
    "path": "/v3/mail/send",
    "headers": {
      "authorization": `Bearer ${process.env.SENDGRID_API_KEY}`,
      "content-type": "application/json"
    }
  };
  
  var req = http.request(options, function (res) {
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
     [ { to: [ { email: 'walter.filho@bcredi.com.br', name: 'Walter Santos Filho' } ],
         dynamic_template_data: { first_name: 'Xico', adjective: '', noun: '', currentDayofWeek: '' },
         subject: 'Hello, World!' } ],
    from: { email: 'wcsantosfilho@gmail.com', name: 'Walter Santos Filho' },
    reply_to: { email: 'wcsantosfilho@gmail.com', name: 'Walter Santos Filho' },
    template_id: 'd-8e3c4b535350446b92481a8a5f2fc976' }));
  req.end();