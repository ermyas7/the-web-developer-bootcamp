const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: false}));

const friends = ["Dina", "Alex", "Ruta", "Hanna", "Embish"];

app.get("/", function(req, res){
    res.render("home");    
});

app.post("/addfriend", function(req, res){
    const newFriend = req.body.newfriend;
    friends.push(newFriend);
    res.redirect("/friends");
});
app.get("/friends", function(req, res){
    res.render("friend", {friends: friends});
});
app.listen(process.env.PORT, function(){
    console.log("server started!");
});