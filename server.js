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

app.post('/', function(req, res) { })

app.listen(port, (err) => {  
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})