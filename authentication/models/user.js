const mongoose        = require("mongoose"),
passportLocalMongoose =   require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

//adds all the methods that are available in passport local mongoose to user
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);