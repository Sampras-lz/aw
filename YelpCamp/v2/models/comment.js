var mongoose    =  require("mongoose");
var comschema = mongoose.Schema({ 
    name    : String ,
    content : String,
    date    : Date
    });
var comment = mongoose.model('comment', comschema);//You can alternatively compiling it into a model without using schemas

module.exports= comment;
