//import all the dependances
const bodyParser = require("body-parser"),
      mongoose   = require("mongoose"),
      methodOveride = require("method-override"),
      express    = require("express");
      
//set up and config app

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOveride("_method"));

//connect and config database

mongoose.connect("mongodb://localhost/blog_app");

const blogSchema = mongoose.Schema({
        title: String,
        image: String,
        body: String,
        created: {type: Date, default: Date.now}
    });
//app model    
const Blog = mongoose.model('blog', blogSchema);

app.get("/", function(req, res){
   res.redirect("/blogs"); 
});
//index route
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
        }
        else{
            res.render("index", {blogs: blogs});
        }
    });
});

//new router
app.get("/blogs/new",function(req, res){
    res.render("new");
})

//create router
app.post("/blogs", function(req, res){
    Blog.create(req.body.blog, function(err, blog){
        if(err){
            res.redirect("/blogs/new");
        }
        else{
            res.redirect("/blogs");
        }
    });
});

//show router
app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        }
        else{
            res.render("show", {blog: foundBlog});
        }
    });
});

//edit router
app.get("/blogs/:id/edit", function(req, res) {
    
   Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs/:id/edit");
        }
        else{
            res.render("edit", {blog: foundBlog});
        }
    }); 
});

//update router
app.put("/blogs/:id", function(req, res){
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect("/blogs/:id/edit");
        }
        else{
            res.redirect("/blogs/:id");
        }
    });    
});
//delete router
app.delete("/blogs/:id", function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blogs/:id");
        }
        else{
            res.redirect("/blogs");
        }
    });
});

//start listening the server
app.listen(process.env.PORT, function(){
    console.log("server started!");
});
