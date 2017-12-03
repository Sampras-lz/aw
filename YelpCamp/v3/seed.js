var	mong    =   require("mongoose"),
	comment =   require("./models/comment"),
	Camp    =   require("./models/camp"),
	user    =   require("./models/user");
	


mong.Promise = global.Promise;
mong.connect('mongodb://localhost/Yelp_Camp_v3', { useMongoClient: true});

var camps= [
    {
        name:"Campsite 1",
        image:"http://3.bp.blogspot.com/-EZslw2DfT5E/VFEMGzI_XYI/AAAAAAAAFuk/U-S7ouns-1A/s1600/Camping-In-Iceland-National-Park-Hd-Wallpaper-.jpg",
        Desc:"This is description for campsite 1",
        Comments:[]
    },
    {
        name:"Campsite 2",
        image:"https://cdn.gearpatrol.com/wp-content/uploads/2016/07/10-Best-Campsites-Gear-Patrol-Fb.jpg",
        Desc:"description for campsite 2",
        Comments:[]
    },
    {
        name:"Campsite 3",
        image:"https://assets.bedful.com/images/d8ea4085f64593109062e8aa4d156044b5198f91/large/image/campsites-in-east-sussex.jpg",
        Desc:"desc for camp 3",
        Comments:[]
    },
    {
        name:"Campsite 4",
        image:"http://i1.cambridge-news.co.uk/incoming/article12958592.ece/ALTERNATES/s1200/Campsites.jpg",
        Desc:"desc    sdcsdcsdcsdcsd",
        Comments:[]
    }
];

var date = new Date();
var com = [
    {
    name    : "user1" ,
    content : "user1 comment",
    date    : date
    },
    {
    name    : "user2" ,
    content : "user2 comment",
    date    : date
    },
    {
    name    : "user3" ,
    content : "user3 comment",
    date    : date
    }
];

camps.forEach(function(j){
    Camp.create(j,function(err,camp){
		if(err){
			console.log(err);
		}else{
			console.log("Added a camp\n");
			com.forEach(function(i){
                comment.create(i,function(err,created){
                    if(err)console.log("err");
                    else{
                        camp.Comments.push(created);
                        console.log("added a comment\n");
                        camp.save(function(err,final){
                            if(err)console.log("err");
                            else{
                                console.log("saved camp\n" + camp);
                            }
                        })
                    }
                })
            });
		}
	});
});