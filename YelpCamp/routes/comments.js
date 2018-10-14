const express    = require("express"),
      Campground = require("../models/campground"),
      Comment    = require("../models/comment"),
      middleware = require("../middleware");

const router = express.Router({mergeParams: true});

//comment form
router.get("/new",middleware.isLoggedIn, function(req, res){
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
router.post("/",middleware.isLoggedIn, function(req, res){
    Comment.create(req.body.comment, function(err, comment){
        if(err){
           req.flash("error", err.message);
           res.redirect("/campgrounds/" + req.params.id + "comments/new"); 
        }
        else{
            //add author to comment model
            const author = {id: req.user._id, username: req.user.username};
            comment.author = author;
            comment.save();
            Campground.findById(req.params.id, (err, foundCampground)=>{
               if(err){
                   req.flash("error", err.message);
               }
               foundCampground.comments.push(comment);
               foundCampground.save((err)=>{
                   if(err){
                       req.flash("error", err.message);
                       res.redirect("/campgrounds/"+ req.params.id + "/comments/new");
                   }
                   else{
                      req.flash("success", "comment successfully added!");
                       res.redirect("/campgrounds/"+ req.params.id);
                   }
               })
            });
        }
    });
});

//edit comment
router.get("/:comment_id/edit",middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
       if(err){
           req.flash("error", err.message);
       } 
       else{
           res.render("comments/edit", {comment: foundComment, campground_id: req.params.id});
       }
    });
});

//update comment
router.put("/:comment_id",middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, foundComment){
       if(err){
           req.flash("error", err.message);
           res.redirect("back");
       }
       else{
           req.flash("success", "comment successfully updated!");
           res.redirect("/campgrounds/" + req.params.id);
       }
   }); 
});

//delete comment
router.delete("/:comment_id",middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           req.flash("error", err.message);
       }
       else{
           req.flash("success", "comment successfully deleted");
           res.redirect("/campgrounds/" + req.params.id);
       }
   }); 
});

module.exports = router;