const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
const campgrounds = [
       {
           name: "Semen Teraroch", 
           image: "https://images.unsplash.com/photo-1534806826444-f55ae657104d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bdabefd573b58ea516189a638a061d79&auto=format&fit=crop&w=667&q=80"
       },
       {
           name: "Green leafed",
           image: "https://images.unsplash.com/photo-1465695954255-a262b0f57b40?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=06d92f647a2937af54f658e199c3d990&auto=format&fit=crop&w=750&q=80"
       },
       {
           name: "hawassa",
           image: "https://images.unsplash.com/photo-1496425745709-5f9297566b46?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b084690f83c5e63fafd161f8bc729a1f&auto=format&fit=crop&w=750&q=80"
       },
        {
            name: "Tana",
            image: "https://images.unsplash.com/photo-1479741044197-d28c298f8c77?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=00a8cfc7aba62bd47f10abd96551cb1d&auto=format&fit=crop&w=750&q=80"
        },
        {
           name: "Semen Teraroch", 
           image: "https://images.unsplash.com/photo-1534806826444-f55ae657104d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bdabefd573b58ea516189a638a061d79&auto=format&fit=crop&w=667&q=80"
       },
       {
           name: "Green leafed",
           image: "https://images.unsplash.com/photo-1465695954255-a262b0f57b40?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=06d92f647a2937af54f658e199c3d990&auto=format&fit=crop&w=750&q=80"
       },
       {
           name: "hawassa",
           image: "https://images.unsplash.com/photo-1496425745709-5f9297566b46?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b084690f83c5e63fafd161f8bc729a1f&auto=format&fit=crop&w=750&q=80"
       },
        {
            name: "Tana",
            image: "https://images.unsplash.com/photo-1479741044197-d28c298f8c77?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=00a8cfc7aba62bd47f10abd96551cb1d&auto=format&fit=crop&w=750&q=80"
        },
        {
           name: "Semen Teraroch", 
           image: "https://images.unsplash.com/photo-1534806826444-f55ae657104d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bdabefd573b58ea516189a638a061d79&auto=format&fit=crop&w=667&q=80"
       },
       {
           name: "Green leafed",
           image: "https://images.unsplash.com/photo-1465695954255-a262b0f57b40?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=06d92f647a2937af54f658e199c3d990&auto=format&fit=crop&w=750&q=80"
       },
       {
           name: "hawassa",
           image: "https://images.unsplash.com/photo-1496425745709-5f9297566b46?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b084690f83c5e63fafd161f8bc729a1f&auto=format&fit=crop&w=750&q=80"
       },
        {
            name: "Tana",
            image: "https://images.unsplash.com/photo-1479741044197-d28c298f8c77?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=00a8cfc7aba62bd47f10abd96551cb1d&auto=format&fit=crop&w=750&q=80"
        },
        {
           name: "Semen Teraroch", 
           image: "https://images.unsplash.com/photo-1534806826444-f55ae657104d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bdabefd573b58ea516189a638a061d79&auto=format&fit=crop&w=667&q=80"
       },
       {
           name: "Green leafed",
           image: "https://images.unsplash.com/photo-1465695954255-a262b0f57b40?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=06d92f647a2937af54f658e199c3d990&auto=format&fit=crop&w=750&q=80"
       },
       {
           name: "hawassa",
           image: "https://images.unsplash.com/photo-1496425745709-5f9297566b46?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b084690f83c5e63fafd161f8bc729a1f&auto=format&fit=crop&w=750&q=80"
       },
        {
            name: "Tana",
            image: "https://images.unsplash.com/photo-1479741044197-d28c298f8c77?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=00a8cfc7aba62bd47f10abd96551cb1d&auto=format&fit=crop&w=750&q=80"
        }
       ]; 
app.get("/", function(req, res){
   res.render("landing"); 
});

app.post("/campgrounds", function(req, res){
    const name = req.body.name;
    const image = req.body.img;
    campgrounds.push({name: name, image: image});
    res.redirect("/campgrounds");
});
app.get("/campgrounds", function(req, res){
   
       res.render("campgrounds", {campgrounds: campgrounds});
});
app.get("/campgrounds/new", function(req, res){
   res.render("new"); 
});

app.listen(process.env.PORT,()=>console.log("server running!"));