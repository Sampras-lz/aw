var mong = require("mongoose"),
passLM   =   require("passport-local-mongoose");
var uschema = new mong.Schema({
    username: String ,
    pass:String ,
    // camps:[{
    //     type:mong.Schema.Types.ObjectId,
    //     ref:"CampGround"
    // }]
});
uschema.plugin(passLM);

module.exports = mong.model("user" , uschema);