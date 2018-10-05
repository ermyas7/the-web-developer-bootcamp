// required dependances
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");

//app config
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

//database config
mongoose.connect("mongodb://localhost/yelp_camp");
const campgroundSchema = mongoose.Schema({
    name: String,
    image: String,
    description: String
});

//model
const Campground = mongoose.model("campgrounds", campgroundSchema);

// Campground.create({
//     name: "tana",
//     image: "https://images.unsplash.com/photo-1505735754789-3404132203ed?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8e0ef56213507ac99a507966ab9c5499&auto=format&fit=crop&w=500&q=60",
//     description: "Tana is the biggest campground in Oklahama area, It have got beautiful trees, flowers, bathroom and the best air condition"
// });
app.get("/", function(req, res){
   res.render("landing"); 
});

app.post("/campgrounds", function(req, res){
    const name = req.body.name;
    const image = req.body.img;
    const desc = req.body.desc;
    const newCamp = {name: name, image: image, description: desc};
    Campground.create(
        newCamp
            , function(err, campground){
                if(err){
                    console.log(err);
                }else{
                res.redirect("/campgrounds");
                }
    });
});
app.get("/campgrounds", function(req, res){
        Campground.find({}, function(err, allCampgrounds){
            if(err){
                console.log(err);
            }else{
                res.render("index", {campgrounds: allCampgrounds});  
            }
        });
});
app.get("/campgrounds/new", function(req, res){
   res.render("new"); 
});

app.get("/campgrounds/:id", function(req, res){
    const id = req.params.id;
    Campground.find({_id: id}, function(err, campground){
        if(err){
            console.log(err);
        }
        else{
            res.render("show", {campground: campground});
        }
    });
})

app.listen(process.env.PORT,()=>console.log("server running!"));