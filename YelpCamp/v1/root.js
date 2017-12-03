var express = require('express');

var app = express();

var parser = require("body-parser");
app.use(parser.urlencoded({extended:true}));

var campsites=[{name:"Rishikesh, Uttarakhand",image:"https://www.indianholiday.com/blog/wp-content/uploads/2014/06/Camping-in-Rishikesh.jpg"},
{name:"Jaisalmer, Rajasthan",image:"https://www.indianholiday.com/blog/wp-content/uploads/2014/06/Camping-in-Jaisalmer.jpg"},
{name:"Chandertal Lake – Himachal Pradesh",image:"https://www.indianholiday.com/blog/wp-content/uploads/2014/06/camping-at-Chandertal-Lake.jpg"},
{name:"Pushkar, Rajasthan",image:"https://www.indianholiday.com/blog/wp-content/uploads/2014/06/camping-in-pushkar.jpg"},
{name:"Jaisalmer, Rajasthan",image:"https://www.indianholiday.com/blog/wp-content/uploads/2014/06/Camping-in-Jaisalmer.jpg"},
{name:"Chandertal Lake – Himachal Pradesh",image:"https://www.indianholiday.com/blog/wp-content/uploads/2014/06/camping-at-Chandertal-Lake.jpg"},
{name:"Pushkar, Rajasthan",image:"https://www.indianholiday.com/blog/wp-content/uploads/2014/06/camping-in-pushkar.jpg"},
{name:"Jaisalmer, Rajasthan",image:"https://www.indianholiday.com/blog/wp-content/uploads/2014/06/Camping-in-Jaisalmer.jpg"},
{name:"Chandertal Lake – Himachal Pradesh",image:"https://www.indianholiday.com/blog/wp-content/uploads/2014/06/camping-at-Chandertal-Lake.jpg"},
{name:"Pushkar, Rajasthan",image:"https://www.indianholiday.com/blog/wp-content/uploads/2014/06/camping-in-pushkar.jpg"}
]


app.get("/" , function(req,res){
    res.render("home.ejs");
})

app.get("/campsites" , function(req,res){
    res.render("camps.ejs",{campsites:campsites});
})

app.get("/CreateSite" , function(req,res){
    res.render("form.ejs");
})

app.post("/CreateSite",function(req,res){
    var camp = req.body;
    console.log(camp);
    campsites.push(camp);
    res.redirect('/campsites');
})

var server = app.listen(process.env.PORT , process.env.IP , function(){
    console.log("Yelpcamp server has been started!!");
})