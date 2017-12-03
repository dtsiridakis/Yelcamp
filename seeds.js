var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Meatball capicola prosciutto hamburger ball tip kevin, salami turducken. Ham hock chicken strip steak meatloaf kielbasa shankle drumstick. Shankle ground round tail pork chop rump ribeye kevin sirloin jowl. Beef flank corned beef, pig prosciutto t-bone venison turkey meatloaf hamburger jerky. Frankfurter salami leberkas andouille, jerky ribeye pork belly short loin hamburger rump bacon jowl. Meatball corned beef bacon tail cupim ball tip shank capicola. Rump pork chop shank ham hock, alcatra meatloaf ball tip venison."
    },
    {
        name: "Desert Mesa",
        image: "http://www.makeyourdayhere.com/ImageRepository/Document?documentID=51",
        description: "Meatball capicola prosciutto hamburger ball tip kevin, salami turducken. Ham hock chicken strip steak meatloaf kielbasa shankle drumstick. Shankle ground round tail pork chop rump ribeye kevin sirloin jowl. Beef flank corned beef, pig prosciutto t-bone venison turkey meatloaf hamburger jerky. Frankfurter salami leberkas andouille, jerky ribeye pork belly short loin hamburger rump bacon jowl. Meatball corned beef bacon tail cupim ball tip shank capicola. Rump pork chop shank ham hock, alcatra meatloaf ball tip venison."
    },
    {
        name: "Canyon Floor",
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Meatball capicola prosciutto hamburger ball tip kevin, salami turducken. Ham hock chicken strip steak meatloaf kielbasa shankle drumstick. Shankle ground round tail pork chop rump ribeye kevin sirloin jowl. Beef flank corned beef, pig prosciutto t-bone venison turkey meatloaf hamburger jerky. Frankfurter salami leberkas andouille, jerky ribeye pork belly short loin hamburger rump bacon jowl. Meatball corned beef bacon tail cupim ball tip shank capicola. Rump pork chop shank ham hock, alcatra meatloaf ball tip venison."
    }
]


function seedDB() {
    //REMOVE ALL CAMPGROUNDS
    Campground.remove({}, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("Campgrounds removed!!");
            //ADD A FEW CAMPGROUNDS
            data.forEach(function(seed) {
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("Campground Added!!!");
                        //CREATE SOME COMMENTS
                        Comment.create(
                            {
                              text:"this place is great but i want interneeet!!",
                              author: "Homer"
                            }, function(err, comment) {
                                if(err) {
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("New comment has created");
                                }
                            });
                    }
                });
            });
        }
    });
}
module.exports = seedDB;
