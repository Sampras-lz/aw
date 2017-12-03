var express = require('express'),
    mong    = require("mongoose"),
    parser  = require("body-parser"),
    app     = express();

app.use(parser.urlencoded({extended:true}));
mong.connect('mongodb://localhost/Blogs', { useMongoClient: true, promiseLibrary: global.Promise });

var blog = mong.model('Blog', { name: String , image: String , date:Date, Desc:String});//You can alternatively use Schema's before compiling it into a model

app.get("/" , function(req,res){
    blog.find({},function(err,allblogs){
        if(err){
            console.log(err);
        }else {
    res.render("home.ejs",{campsites:allblogs});
        }
})})

app.get("/show/:id" , function(req,res){
    blog.find({_id:req.params.id},function(err,blogs){
        if(err) console.log(err); else {res.render("show.ejs" ,{blog:blogs[0]});}
        })
    }
)

app.get("/edit/:id" , function(req,res){
    blog.findById(req.params.id,function(err,blogs){
        if(err) console.log(err); else {res.render("update.ejs" ,{blog:blogs});}
        })
    }
)

app.get("/new" , function(req,res){
    res.render("new.ejs");
})

app.post("/update/:id" , function(req,res){
    blog.findById(req.params.id,function(err,Blog){
        if(err) res.send("Error finding the blog (index.js:40)");
        else {
            Blog.set(req.body);
            Blog.save(function(err,updatedblog){
                if(err){
                    res.send("error saving (index.js:45)");
                }
                else{
                    res.redirect("/show/" + req.params.id)
                }
            })
        }
        })
    }
)


app.post("/new",function(req,res){
    blog.create((req.body.date=new Date(),req.body),function(err,camp){
        if(err){
            console.log(err);
        }else{
            console.log("Added\n" + camp);
        }
        res.redirect('/show/' + camp._id);
    });
})

app.get("/delete/:id",function(req,res){
    blog.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.send(err);
        }
        else{
            res.redirect("/");
        }
    })
})

var server = app.listen(process.env.PORT , process.env.IP , function(){
    console.log("Blog has been started!!");
})

// The put and delete methods additional to get and post methods are vital
// for  using put or delete method a module "method-override" must be used 
// in additiona there are other database methods used for updating and deleting or fiding posts
