const express   = require("express"),
      passport  = require("passport"),
      flash     = require("connect-flash"),
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
            req.flash("error", err.message);
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
router.post("/login", function (req, res, next) {
  passport.authenticate("local",
    {
      successRedirect: "/campgrounds",
      failureRedirect: "/login",
      failureFlash:  "Invalid Username or password",
      successFlash: "Welcome to YelpCamp, " + req.body.username + "!"
    })(req, res);
});

//logout logic
router.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "successfully logged out");
   res.redirect("/campgrounds");
});

module.exports = router;