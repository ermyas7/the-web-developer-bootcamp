const Campground = require("../models/campground"),
      Comment    = require("../models/comment");
const middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "please login first");
    res.redirect("/login");
}

middlewareObj.checkCampgroundOwnership = function checkCampgroundOwnership(req, res, next){
    if(req.user){
        Campground.findById(req.params.id, function(err, foundCampground){
           if(err){
               req.flash("error", err.name);
               console.log(err);
           }
           else{
               if(foundCampground.author.id.equals(req.user._id)){
                   next();
               }
               else{
                   req.flash("error", "you do not have permission!");
                   res.redirect("back");
               }
           }
        });
    
    }
    else{
        req.flash("error", "please login first");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function checkCommentOwnership(req, res, next){
    if(req.user){
        Comment.findById(req.params.comment_id, function(err, foundComment){
           if(err){
               req.flash("error", err.message);
           }
           else{
               if(foundComment.author.id.equals(req.user._id)){
                   next();
               }
               else{
                   req.flash("error", "you do not have permission");
                   res.redirect("back");
               }
           }
        });
    
    }
    else{
        req.flash("error", "please login first");
        res.redirect("back");
    }
}

module.exports = middlewareObj;