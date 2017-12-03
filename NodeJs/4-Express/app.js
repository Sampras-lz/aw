var express = require('express');

var app = express();

var parser = require("body-parser");

var posts = 
    posts =[
        {title:'Cats',author:"Sampras"},
        {title:'Dogs' , author: "Shaun"},
        {title:'goat' ,author:'ashley'}
    ];
app.use(parser.urlencoded({extended:true}));

// '/' -> "Hi there!"
app.get('/' , function(req , res){
    res.render("home.ejs");
})

app.get('/posts' , function(req , res){
    res.render("posts.ejs" , {posts:posts});
})

app.post('/newpost' , function(req , res){
	var post = req.body;
	posts.push(post);
	console.log(post);
	res.redirect('/posts');
})

app.get("/fallinlove/:thing" , function(req,res){
var thing = req.params.thing;
    res.render("love.ejs", { Love : thing});
})

var server = app.listen(process.env.PORT , process.env.IP , function(){
    console.log("Server has been started!!");
})
