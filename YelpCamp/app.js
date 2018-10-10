// dependances
const bodyParser = require("body-parser"),
mongoose = require("mongoose"),
Campground = require("./models/campgrounds"),
Comment = require("./models/comments"),
seedDB = require("./seeds"),
express = require("express");

//app config
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
//serve public directory
app.use(express.static(__dirname+"/public"));

//database config
mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });

seedDB();
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
                res.render("campgrounds/index", {campgrounds: allCampgrounds});  
            }
        });
});
app.get("/campgrounds/new", function(req, res){
   res.render("campgrounds/new"); 
});

app.get("/campgrounds/:id", function(req, res){
    const id = req.params.id;
    Campground.findById({_id: id}).populate("comments").exec(function(err, campground){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/show", {campground: campground});
        }
    });
});

//###########################################
// comment route                             //
//###########################################

//add comment route
app.get("/campgrounds/:id/comment/new", function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
       if(err){
           res.redirect("/campgrounds");
       } 
       else{
           res.render("comments/new", {campground: foundCampground});
       }
    });
});

//create comment route
app.post("/campgrounds/:id/comment", function(req, res){
    Comment.create(req.body.comment, function(err, comment){
        if(err){
           res.redirect("/campgrounds/" + req.params.id + "comments/new"); 
        }
        else{
            Campground.findById(req.params.id, (err, foundCampground)=>{
               if(err){
                   console.log("error");
               }
               foundCampground.comments.push(comment);
               foundCampground.save((err)=>{
                   if(err){
                       res.redirect("/campgrounds/"+ req.params.id + "/comment/new");
                   }
                   else{
                       console.log("comment posted");
                       res.redirect("/campgrounds/"+ req.params.id);
                   }
               })
            });
        }
    });
});
app.listen(process.env.PORT,()=>console.log("server running!"));