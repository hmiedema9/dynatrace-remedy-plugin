const express = require('express')  
const app = express()
const port = 3000
const bodyParser = require('body-parser');

var router = express.Router();

// for parsing JSON
app.use(bodyParser.json({ type: 'application/json' }));

app.use((request, response, next) => {  
  console.log(request.headers)
  console.log("Test")
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
  var problem_id = body.msg.problem_id;
  var slug = body.msg.slug;
  var token = body.msg.unique_token;

  console.log(trackingNumber, slug, token);

  res.json({
      message: 'received message'
   });
 })

app.listen(port, (err) => {  
  if (err) {
    return console.log('Something went wrong', err)
  }

  console.log(`server is listening on ${port}`)
})