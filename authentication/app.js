const express               =  require("express"),
      bodyParser            =  require("body-parser"),
      mongoose              =  require("mongoose"),
      User                  =  require("./models/user"),
      passport              =  require("passport"),
      LocalStrategy         =  require("passport-local"),
      passportLocalMongoose =   require("passport-local-mongoose");
      
mongoose.connect("mongodb://localhost/auth_demo", { useNewUrlParser: true });
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
//creats a session with the given option
app.use(require("express-session")({
    secret: "are you really doing this bro", //used to encode and decode session
    resave: false,
    saveUninitialized: false //two more properties which are required for express session
}));
//tells app to use passport
app.use(passport.initialize());

//starts the session and always required
app.use(passport.session());
//used to encode/serialize session
passport.serializeUser(User.serializeUser());
//used to unecode/deserialize session
passport.deserializeUser(User.deserializeUser());
//use local strategy for authentication
passport.use(new LocalStrategy(User.authenticate()));
//homepage route
app.get("/", function(req, res){
   res.render("home"); 
});

//secret route
app.get("/secret",isLoggedIn,function(req, res){
    res.render("secret");
});

//==============================
//==============================

//register form
app.get("/register", function(req, res){
    res.render("register");
});

//register logic
app.post("/register", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.redirect("/register");
        }
        //authenticate user and let him login
        passport.authenticate("local")(req, res, function(){
            res.redirect("/secret");
        })
        
    });
});

//login form
app.get("/login", function(req, res){
    res.render("login");
});

//login logic
app.post("/login",passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function(res, req){});

//logout
app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(process.env.PORT, function(){
    console.log("server started..");
});
     