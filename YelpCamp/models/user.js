const mongoose              = require("mongoose"),
      passportLocalMongoose = require("passport-local-mongoose");    

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

//add bunch of methods to user which comes with passportLocalMongoose
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);