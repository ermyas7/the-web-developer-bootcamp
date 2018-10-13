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
            //add author to comment model
            const author = {id: req.user._id, username: req.user.username};
            comment.author = author;
            comment.save();
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

//edit comment
router.get("/:comment_id/edit",checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
       if(err){
           console.log(err);
       } 
       else{
           res.render("comments/edit", {comment: foundComment, campground_id: req.params.id});
       }
    });
});

//update comment
router.put("/:comment_id",checkCommentOwnership, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, foundComment){
       if(err){
           console.log(err);
           res.redirect("back");
       }
       else{
           res.redirect("/campgrounds/" + req.params.id);
       }
   }); 
});

//delete comment
router.delete("/:comment_id",checkCommentOwnership, function(req, res){
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           console.log(err);
       }
       else{
           res.redirect("/campgrounds/" + req.params.id);
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

function checkCommentOwnership(req, res, next){
    if(req.user){
        Comment.findById(req.params.comment_id, function(err, foundComment){
           if(err){
               console.log(err);
           }
           else{
               if(foundComment.author.id.equals(req.user._id)){
                   next();
               }
               else{
                   res.redirect("back");
               }
           }
        });
    
    }
    else{
        res.redirect("back");
    }
}


module.exports = router;