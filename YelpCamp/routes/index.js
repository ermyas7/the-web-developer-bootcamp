const express   = require("express"),
      passport  = require("passport"),
      User      = require("../models/user");

const router = express.Router();

//landing page
router.get("/", function(req, res){
   res.render("landing"); 
});
//register form
router.get("/register", function(req, res){
   res.render("register"); 
});

//register logic
router.post("/register", function(req, res){
    const newUser = {username: req.body.username};
    User.register(new User(newUser), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        //authenticate and let the user login
        passport.authenticate("local")(req, res, function(){
           res.redirect("/campgrounds"); 
        });
    });
});

//login form
router.get("/login", function(req, res){
   res.render("login"); 
});

//login logic
router.post("/login", passport.authenticate("local",{
 successRedirect: "/campgrounds",
 failureRedirect: "/login"
}));

//logout logic
router.get("/logout", function(req, res){
   req.logout();
   res.redirect("/campgrounds");
});

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;