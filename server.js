const express = require('express');
const app = express();
const PORT = 8081;

//app.use('/public', express.static('public'));

app.get('/dev/random_joke', function (req, res) {
   var response = {
       "setup": "Did you hear about the two silk worms in a race?",
       "punchline": "It ended in a tie"
   };

   var data = JSON.stringify(response, null, 4);
   console.log(data);
   res.end(data);
});

var server = app.listen(PORT, function (port) {
  console.log("Listening at http://localhost:%s", PORT);;
});
