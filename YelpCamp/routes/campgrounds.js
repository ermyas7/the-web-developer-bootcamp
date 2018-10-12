const express = require("express"),
      Campground = require("../models/campground");    

const router = express.Router();

router.post("/",isLoggedIn, function(req, res){
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
router.get("", function(req, res){
        Campground.find({}, function(err, allCampgrounds){
            if(err){
                console.log(err);
            }else{
                res.render("campgrounds/index", {campgrounds: allCampgrounds});  
            }
        });
});
router.get("/new",isLoggedIn, function(req, res){
   res.render("campgrounds/new"); 
});

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