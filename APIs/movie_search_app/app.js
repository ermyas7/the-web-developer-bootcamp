const express = require("express");
const request = require("request");
const app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("home");
});
app.get("/results", function(req, res){
    const query = req.query.title;
    const url = "http://www.omdbapi.com/?apikey=thewdb&s=" + query;
   request(url, function(error, response, body){
       if(!error && response.statusCode == 200){
           const searchs = JSON.parse(body);
           res.render("results", {searchs:searchs});
       }
   }); 
});

app.listen(process.env.PORT, function(){
    console.log("server running");
});

