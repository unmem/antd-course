const express = require('express')
const app = express()
const PORT = 8081

const random_jokes = [
  {
    setup: 'How many South Americans does it take to change a lightbulb?',
    punchline: 'A Brazilian',
  },
  {
    setup: 'Why is peter pan always flying?',
    punchline: 'Because he neverlands',
  },
]

let random_joke_call_count = 0

//app.use('/public', express.static('public'));

app.get('/dev/random_joke', function(req, res) {
  const responseObj = random_jokes[random_joke_call_count % random_jokes.length]
  random_joke_call_count += 1

  var data = JSON.stringify(responseObj, null, 4)
  console.log(data)
  res.end(data)
})

var server = app.listen(PORT, function() {
  console.log('Listening at http://localhost:%s', PORT)
})
