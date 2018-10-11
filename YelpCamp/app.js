// dependances
const bodyParser            = require("body-parser"),
      mongoose              = require("mongoose"),
      passport              = require("passport"),
      LocalStrategy         = require("passport-local"),
      passportLocalMongoose = require("passport-local-mongoose"),
      Campground            = require("./models/campgrounds"),
      Comment               = require("./models/comments"),
      User                  = require("./models/user"),
      seedDB                = require("./seeds"),
      express               = require("express");

//app config
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
//serve public directory
app.use(express.static(__dirname+"/public"));

app.use(require("express-session")({
    secret: "ohhh you are kidding right",
    resave: false,
    saveUninitialized: false
}));

//##########################################################
//config passport

app.use(passport.initialize());
app.use(passport.session());

//encode and unencode session
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new LocalStrategy(User.authenticate()) );

//#########################################################
//database config
mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });

seedDB();
app.get("/", function(req, res){
   res.render("landing"); 
});

app.post("/campgrounds", function(req, res){
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
app.get("/campgrounds", function(req, res){
        Campground.find({}, function(err, allCampgrounds){
            if(err){
                console.log(err);
            }else{
                res.render("campgrounds/index", {campgrounds: allCampgrounds});  
            }
        });
});
app.get("/campgrounds/new", function(req, res){
   res.render("campgrounds/new"); 
});

app.get("/campgrounds/:id", function(req, res){
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

//###########################################
// comment route                             //
//###########################################

//add comment route
app.get("/campgrounds/:id/comment/new", function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
       if(err){
           res.redirect("/campgrounds");
       } 
       else{
           res.render("comments/new", {campground: foundCampground});
       }
    });
});

//create comment route
app.post("/campgrounds/:id/comment", function(req, res){
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
                       res.redirect("/campgrounds/"+ req.params.id + "/comment/new");
                   }
                   else{
                       console.log("comment posted");
                       res.redirect("/campgrounds/"+ req.params.id);
                   }
               })
            });
        }
    });
});

//#####################################
// authenticate route
//#####################################
//register form
app.get("/register", function(req, res){
   res.render("register"); 
});

//register logic
app.post("/register", function(req, res){
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
app.get("/login", function(req, res){
   res.render("login"); 
});

//login logic
app.post("/login", passport.authenticate("local",{
 successRedirect: "/campgrounds",
 failureRedirect: "/login"
}));

//logout logic
app.get("/logout", function(req, res){
   req.logout();
   res.redirect("/campgrounds");
});

app.listen(process.env.PORT,()=>console.log("server running!"));