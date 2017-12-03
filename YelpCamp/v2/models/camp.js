var mong    =  require("mongoose");
var campschema = mong.Schema({ 
    name    : String ,
    image   : String ,
    Desc    : String,
    Comments:[
        {
            type:mong.Schema.Types.ObjectId,
            ref:"comment"
        }
    ]
    });
var camp = mong.model('CampGround', campschema);//You can alternatively compiling it into a model without using schemas

module.exports= camp;
