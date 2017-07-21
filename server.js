const express = require('express')  
const app = express()
const port = 8080
const bodyParser = require('body-parser');

var router = express.Router();

// for parsing JSON
app.use(bodyParser.json({ type: 'application/json' }));

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
 })

app.listen(port, (err) => {  
  if (err) {
    return console.log('Something went wrong', err)
  }

  console.log(`server is listening on ${port}`)
})