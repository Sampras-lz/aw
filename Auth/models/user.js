var mong = require("mongoose"),
passLM   =   require("passport-local-mongoose");
var User =  new mong.Schema({
    username: String ,
    password:String
});
User.plugin(passLM);

module.exports = mong.model("User" , User);