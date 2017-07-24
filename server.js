const express = require('express')  
const app = express()
const port = 8080
const bodyParser = require('body-parser');
'use strict';
const nodemailer = require('nodemailer');
var router = express.Router();

// for parsing JSON
app.use(bodyParser.json({ type: 'application/json' }));

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'smtp.example.com',
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: 'username@example.com',
        pass: 'userpass'
    }
});

// setup email data with unicode symbols
let mailOptions = {
    from: 'dynatrace-alerts@kp.org <dynatrace-alerts@kp.org>', // sender address
    to: 'hayden.miedema@dynatrace.com, haydenmiedema@gmail.com', // list of receivers
    subject: 'Test alert for problem notification', // Subject line
    text: 'Test alert', // plain text body
    html: '<b>Sending HTML in body</b>' // html body
};

app.use((request, response, next) => {  
  console.log(request.headers)
  next()
})

// app.use((request, response, next) => {  
//   request.chance = Math.random()
//   next()
// })

app.get('/', (request, response) => {  
  response.json({
    chance: request.chance
  })
})

app.post('/', function(req, res) {
  var body = req.body;
  var problem_state = body.State;
  var problem_id = body.ProblemID;
  var problem_title = body.ProblemTitle;
  

  console.log("Data Below");
  console.log("Problem ID:", problem_id, "\nProblem State:", problem_state, "\nProblem Title:", problem_title);

  res.json({
      message: 'received message'
   });

   // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });
 })

app.listen(port, (err) => {  
  if (err) {
    return console.log('Something went wrong', err)
  }

  console.log(`server is listening on ${port}`)
})