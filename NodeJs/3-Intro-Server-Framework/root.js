var express = require('express');

var app = express();

// '/' -> "Hi there!"
app.get('/' , function(req , res){
    res.send("Hi there!")
})
// '/dog' -> "you are on dog"

app.get('/dog' , function(req , res){
    res.send("you are on dog")
})
// '/cat' -> "you are on cat"
app.get('/cat' , function(req , res){
    res.send("<button>hey</button>you are on cat")
})


// The Below fuctions are for exercise

app.get('/speak/:animal' , function(req , res){
    var animal = req.params.animal;
    if(animal=="pig")
    res.send("Oink");
    else if(animal=="cow")
    res.send("Moo");
    else if(animal=="dog")
    res.send("Woof Woof!");
    else res.send("Sorry, We don't have that animal. You can meet the pig, cow or dog");
})

app.get('/repeat/:word/:num' , function(req , res){
    var word = req.params.word;
    console.log("Word:" + word);
    var num = req.params.num;
    console.log("num: " + num);
    var string= word;
    for (var i =1 ; i<num ; i++){
        string = string + " " + word ;
    }
    res.send(string);
})

app.get('*' , function(req , res){
    res.send("Page not Found");
})


var server = app.listen(process.env.PORT , process.env.IP , function(){
    console.log("Server has been started!!");
})
