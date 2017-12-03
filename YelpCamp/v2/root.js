var express = require('express'),
    mong    = require("mongoose"),
    parser  = require("body-parser"),
    comment = require("./models/comment"),
    Camp    = require("./models/camp"),
    app     = express();

app.use(express.static(__dirname + '/public'));
app.use(parser.urlencoded({extended:true}));
mong.Promise = global.Promise;
mong.connect('mongodb://localhost/Yelp_Camp_v2', { useMongoClient: true});
app.set("view engine" , "ejs");

app.get("/" , function(req,res){
    Camp.find({},function(err,allcamps){
        if(err){
            console.log(err);
        }else {
    res.render("camps.ejs",{campsites:allcamps});
        }
})})

app.get("/campsites/:camp" , function(req,res){
    Camp.findById(req.params.camp).populate("Comments").exec(function(err,camp){
        if(err) res.send(err);
        else{
            res.render("show" ,{campsite:camp}); 
            console.log("checking" + camp);
            }
   } )
})

app.get("/CreateSite" , function(req,res){
    res.render("form.ejs");
})

app.post("/CreateSite",function(req,res){
    var camp = req.body;
    console.log(camp);
    Camp.create(camp,function(err,camp){
        if(err){
            console.log(err);
        }else{
            console.log("Added\n" + camp);
        }
    });
    res.redirect('/');
})

app.post("/newcomment/:id",function(req,res){
    var com      = req.body;
        com.date = new Date();
    comment.create(com,function(err,created){
        if(err) res.send(err);
        else{
        Camp.findById(req.params.id,function(err,camp){
        if(err) res.send("Error finding the blog (root.js:53)");
        else {
            camp.Comments.push(created)
            camp.save(function(err,updatedcamp){
                if(err){
                    res.send("error saving (root.js:58)");
                }
                else{
                    res.redirect("/campsites/" + req.params.id)
                }
            })
        }
        })
        }
    })
    
})

var server = app.listen(process.env.PORT , process.env.IP , function(){
    console.log("Yelpcamp server has been started!!");
})