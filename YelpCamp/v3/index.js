var express = require('express'),
	mong    = require("mongoose"),
	parser  = require("body-parser"),
	comment = require("./models/comment"),
	Camp    = require("./models/camp"),
	app     = express(),
	pass	= require("passport"),
	passL	= require("passport-local"),
	passLM	= require("passport-local-mongoose"),
	method	= require('method-override'),
	user	= require("./models/user");

mong.Promise = global.Promise;
mong.connect('mongodb://localhost/Yelp_Camp_v3', { useMongoClient: true});
//==========
app.use(require("express-session")({
	secret:"codecodecode",
	resave:false,
	saveUninitialized:false
}));
app.use(express.static(__dirname + '/public'));
app.use(parser.urlencoded({extended:true}));
app.set("view engine" , "ejs");
app.use(pass.initialize());
app.use(pass.session());
//=============
pass.use( new passL(user.authenticate()));
pass.serializeUser(user.serializeUser());
pass.deserializeUser(user.deserializeUser());


var isLoggedIn = function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}else{
		res.redirect("/login")
	}
}
//====================
// GET Routes
//=================
app.get("/" , function(req,res){
	Camp.find({},function(err,allcamps){
		if(err){
			console.log(err);
		}else {
	res.render("home",{campsites:allcamps , User:req.user});
		}
})});

app.get("/campsites/:camp" , function(req,res){
	Camp.findById(req.params.camp).populate("Comments").exec(function(err,camp){
		if(err) res.send(err);
		else{
			res.render("show" ,{campsite:camp , User:req.user});
			}
   } )
});

app.get("/CreateSite" , isLoggedIn , function(req,res){
	res.render("form" , {User:req.user});
});

app.get("/edit/:id" ,isLoggedIn, function(req,res){
    Camp.findById(req.params.id,function(err,foundcamp){
        if(err) console.log(err); else {res.render("update.ejs" ,{camp:foundcamp , User:req.user});}
        })
    }
)

app.get("/register",function(req,res){
	res.render("register", {User:req.user});
});


app.get("/login" , function(req,res){
	res.render("login", {User:req.user});
});

app.get('/logout' , function(req,res){
	req.logout();
	res.redirect('/');
})

//=========================
//POST routes
//=========================

app.post("/CreateSite", isLoggedIn ,function(req,res){
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
});

app.post("/newcomment/:id", isLoggedIn ,function(req,res){
	var com      = req.body;
		com.date = new Date();
		com.name = req.user.username ;
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
});

app.post("/update/:id" ,isLoggedIn, function(req,res){
    Camp.findById(req.params.id,function(err,camp){
        if(err) res.send("Error finding the blog (index.js:40)");
        else {
            camp.set(req.body);
            camp.save(function(err,updatedcamp){
                if(err){
                    res.send("error saving (index.js:45)");
                }
                else{
                    res.redirect("/show/" + req.params.id)
                }
            });
        }
        })
    }
);

app.post("/register",function(req,res){
  console.log( req.body.username);
  console.log( req.body.password);
  user.register(new user({username:req.body.username}),req.body.password ,function(err,user){
	   if(err){
		   console.log(err);
		   res.send(err);
	   }else{
		   pass.authenticate("local")(req,res,function(){
			   console.log("authenticated");
			   res.redirect("/");
		   })
	   }
  });
});

app.post("/login",pass.authenticate("local" ,{
	successRedirect:"/",
	failureRedirect:"/login"
}),function(req,res){
});


var server = app.listen(process.env.PORT , process.env.IP , function(){
	console.log("Yelpcamp server has been started!!");
})