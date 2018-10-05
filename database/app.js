const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/dogs");
mongoose.set('useCreateIndex', true);
const dogSchema = mongoose.Schema({
    name: String,
    age: Number,
    breed: String
});

const Dog = mongoose.model("Dog", dogSchema);

Dog.create({name: "Billy", age: 3, breed: "local"}, (err, dogs)=>{
    if(err){
        console.log("an Error happend");
    }
    else{
        console.log(dogs);
    }
}); 
Dog.remove({name: "Billy"}, (err, dogs)=>{
    if(err){
        console.log("an Error happend");
    }
    else{
        console.log(dogs);
    }
}); 