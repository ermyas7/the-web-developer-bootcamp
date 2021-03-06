const express    = require("express"),
      Campground = require("../models/campground"),
      middleware = require("../middleware");

const router = express.Router();

//new campground 
router.get("/new",middleware.isLoggedIn, function(req, res){
   res.render("campgrounds/new"); 
});

//create campground
router.post("/",middleware.isLoggedIn, function(req, res){
    const newCamp = {
                        name: req.body.name,
                        image: req.body.img,
                        description: req.body.desc,
                        author:  {
                                    id: req.user._id,
                                    username: req.user.username
                            
                        },
                        price: req.body.price
        
    };
    Campground.create(newCamp, function(err, campground){
                if(err){
                    req.flash("error", err.message);
                }
                else{
                req.flash("success", "you have successfully added new campground");    
                res.redirect("/campgrounds");
                }
    });
});

//all campgrounds
router.get("", function(req, res){
    if(req.query.search){
        const search = new RegExp(req.query.search, 'i');
        Campground.find({name: search}, function(err, allCampgrounds){
            if(err){
                req.flash("error", err.message);
            }
            if(allCampgrounds.length < 1){
                req.flash("error", "No campground found please try again!");
                res.redirect("back");
            }
            else{
                res.render("campgrounds/index", {campgrounds: allCampgrounds});  
            }
        });
        
    }
    else{
        Campground.find({}, function(err, allCampgrounds){
            if(err){
                req.flash("error", err.message);
            }else{
                res.render("campgrounds/index", {campgrounds: allCampgrounds});  
            }
        });
        
    }    
});


// show campground
router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, campground){
        if(err){
            req.flash("error", err.message);
        }
        else{
            res.render("campgrounds/show", {campground: campground});
        }
    });
});

//edit campground
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            req.flash("error", err.message);
        }
        else{
           res.render("campgrounds/edit", {campground: foundCampground}); 
            }
    });
});    

//update campground
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
       if(err){
           req.flash("error", err.message);
       }
       else{
          req.flash("success", "campground successfully updated"); 
          res.redirect("/campgrounds/" + req.params.id );
       }
    });
});

//delete campground
router.delete("/:id",middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
    if(err){
        req.flash("error", err.message);
    } 
    else{
        req.flash("success", "campground successfully deleted");
        res.redirect("/campgrounds");
        }
    });
});

module.exports = router;