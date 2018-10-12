const express = require("express"),
      Campground = require("../models/campground");    

const router = express.Router();

//new campground 
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
    Campground.findById(req.params.id).populate("comments").exec(function(err, campground){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/show", {campground: campground});
        }
    });
});

//edit campground
router.get("/:id/edit", function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            res.redirect("/campgrounds");
        }
        else{
            res.render("campgrounds/edit", {campground: foundCampground});
        }
    });
});

//update comment
router.put("/:id", function(req, res){
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
      if(err){
          console.log(err);
          res.redirect("/campgrounds");
      } 
      else{
          res.redirect("/campgrounds/" + req.params.id );
      }
   });
});

//delete comment
router.delete("/:id", function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
      if(err){
          console.log(err);
          res.redirect("/campgrounds");
      } 
      else{
          res.redirect("/campgrounds");
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