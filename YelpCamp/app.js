// dependances
const bodyParser            = require("body-parser"),
      mongoose              = require("mongoose"),
      passport              = require("passport"),
      LocalStrategy         = require("passport-local"),
      passportLocalMongoose = require("passport-local-mongoose"),
      flash                 = require("connect-flash"),
      campgroundRouter      = require("./routes/campgrounds"),
      commentRouter         = require("./routes/comments"),
      indexRouter           = require("./routes/index"),
      Campground            = require("./models/campground"),
      Comment               = require("./models/comment"),
      User                  = require("./models/user"),
      seedDB                = require("./seeds"),
      methodOverride        = require("method-override"),
      express               = require("express");

//app config
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
//serve public directory
app.use(express.static(__dirname+"/public"));

app.use(methodOverride("_method"));

app.use(require("express-session")({
    secret: "ohhh you are kidding right",
    resave: false,
    saveUninitialized: false
}));

app.use(flash());
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

//seedDB();
//make user accessible globally for all route
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.success     = req.flash("success");
    res.locals.error       = req.flash("error");
    next();
});
//use middleware


//use imported routers
app.use("/", indexRouter);
app.use("/campgrounds", campgroundRouter);
app.use("/campgrounds/:id/comments",commentRouter);


app.listen(process.env.PORT,()=>console.log("server running!"));