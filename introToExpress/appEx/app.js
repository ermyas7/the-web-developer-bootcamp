const express = require("express");

const app = express();

//home route
app.get('/', function(req, res){
    res.send("Hi there, welcome to my assignment!");
});

app.get('/speak/:animal', function(req, res){
   const animal = req.params.animal.toLowerCase()
   ;
   const sound = {
       pig: "Oink",
       cow: "Moo",
       dog: "Woof Woof"
   };
   if(sound[animal]){
       res.send("the " + animal +" says '" + sound[animal] + "'");
   }
  res.send("Sorry page is not found.... what are you doing with your life!"); 
   
});

app.get('/repeat/:text/:number', function(req, res){
    let number = Number(req.params.number);
    let string = '';
    if(number){
        while(number > 0){
            string = string + req.params.text + ' ';
            number--;
        }
        res.send(string);
    }
});

app.get('*', function(req, res){
   res.send("Sorry page is not found.... what are you doing with your life!"); 
});

app.listen(process.env.PORT, ()=>console.log("server started!"));