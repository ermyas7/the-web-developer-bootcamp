//import all the dependances
const bodyParser = require("body-parser"),
      mongoose   = require("mongoose"),
      express    = require("express");
      
//set up and config app

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

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
//  Blog.create({
//      title: "Focus",
//     image: "https://images.unsplash.com/photo-1501644898242-cfea317d7faf?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=29b956ae2e9f82ad472a030fac347ca1&auto=format&fit=crop&w=500&q=60",
//      body: 
//             "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
            
//  }, function(err, blog){
//      if(err){
//         console.log(err);
//     }
//     else{
//         console.log(blog);
//     }
// });

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

app.get("/", function(req, res){
   res.redirect("/blogs"); 
});

//start listening the server
app.listen(process.env.PORT, function(){
    console.log("server started!");
});
