const express = require("express");
const app = express();
app.use(express.static('public'));
app.set("view engine", "ejs");
app.get('/', function(req, res){
    res.render("home");
});

app.get('/loving/:pet',function(req, res){
    const pet = req.params.pet;
    res.render("love", {pet: pet});
});

app.get('/post', function(req, res){
   const posts = [
       {
           title: "getting started with nodejs",
           author: "Ermyas",
           body: "node js is a javascript framework with enables the developer work on backend using his favorite javascript"
       },
       {
           title: "why do you want to study",
           author: "Abeni",
           body: "you gotta study if you want to get you dream 10 pt and feel confident whatever you call it"
       },
       {
           title: "how focused are you",
           author: "Ermyas",
           body: "my focus cant be measured dude what do you mean by that! am I even concernded about focus as much as the job I am intended to do is got done"
       }
       ];
       res.render("posts", {posts: posts});
});
app.listen(process.env.PORT, ()=> console.log("server started!!"));