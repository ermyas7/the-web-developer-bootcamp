const express = require("express"),
      Campground = require("../models/campground");    

const router = express.Router();

//new campground form
router.get("/new",isLoggedIn, function(req, res){
   res.render("campgrounds/new"); 
});

//create campground
router.post("/",isLoggedIn, function(req, res){
    const user = {id: req.user._id, username: req.user.username};
    const newCamp = {name: req.body.name, image: req.body.img, description: req.body.desc, author: user};
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

//all campgrounds
router.get("", function(req, res){
        Campground.find({}, function(err, allCampgrounds){
            if(err){
                console.log(err);
            }else{
                res.render("campgrounds/index", {campgrounds: allCampgrounds});  
            }
        });
});

// show campground
router.get("/:id", function(req, res){
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

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;