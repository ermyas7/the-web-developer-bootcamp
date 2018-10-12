const express       = require("express"),
      Campground    = require("../models/campground"),
      Comment       = require("../models/comment");    

const router = express.Router({mergeParams: true});

//comment form
router.get("/new",isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
       if(err){
           res.redirect("/campgrounds");
       } 
       else{
           res.render("comments/new", {campground: foundCampground});
       }
    });
});

//create comment 
router.post("/",isLoggedIn, function(req, res){
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
                       res.redirect("/campgrounds/"+ req.params.id + "/comments/new");
                   }
                   else{
                      
                       res.redirect("/campgrounds/"+ req.params.id);
                   }
               })
            });
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