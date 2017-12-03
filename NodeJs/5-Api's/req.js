var request = require('request');

var url = "https://api.themoviedb.org/3/search/movie?api_key=2da5c595107740550c820703dd042b75&query=Guardians+of+the+Galaxy+vol+2";

request(url , function(error,res,body){
    var data = JSON.parse(body);
    var obj = {};
    obj = body ;
console.log(typeof(obj));
console.log(data.results[0].title);
})