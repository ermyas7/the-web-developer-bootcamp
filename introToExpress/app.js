var express = require('express');
var app = express();
app.get('/', function (req, res) {
  res.send('Hello there!')
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log('server started!');
} )
