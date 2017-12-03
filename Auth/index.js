var express	=	require("express");
var mong	=	require("mongoose");
var pass	=	require("passport");
var parser	=	require("body-parser");
var passL	=	require("passport-local");
var passLM	=	require("passport-local-mongoose"),
	User	=	require("./models/user");


mong.Promise = global.Promise;
mong.connect("mongodb://localhost/test" , {useMongoClient:true});


var app = express();
app.set('view engine' , 'ejs');
app.use(parser.urlencoded({extended:true}));
app.use(require('express-session')({
	secret:"youshallnotpass",
	resave:false,
	saveUninitialized : false
}));

app.use(pass.initialize());
app.use(pass.session());
pass.use(new passL(User.authenticate()));
pass.serializeUser(User.serializeUser());
pass.deserializeUser(User.deserializeUser());

//=============

app.get("/" , function(req,res){
	res.render('home');
});

app.get("/auth" , function(req,res){
	res.render('auth');
});

app.get('/register' , function(req,res){
	res.render('register');
});

app.get('/login' , function(req,res){
	res.render('login');
});

app.post('/register' , function(req,res){
	User.register(new User({username : req.body.user}) , req.body.pass , function(err,user){
		if(err){
			console.log(err);
			res.send(err);
		} else {
			pass.authenticate("local")(req,res,function(){
				res.redirect("/auth");
			});
		}
	})
});

app.post('/login' , pass.authenticate("local" , {
	successRedirect : "/auth",
	failureRedirect : "/login"
}) , function(req,res){
	
});

app.listen(process.env.PORT , process.env.IP , function(){
	console.log("auth is started...\n");
})