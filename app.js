var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    flash       = require("connect-flash"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Campground  = require("./models/campgrounds"),
    seedDB      = require("./seeds"),
    Comment     = require("./models/comment"),
    session     = require("express-session"),
    User        = require("./models/user");

//REQUIRING ROUTES    
var campgroundRoutes = require("./routes/campgrounds"),  
    commentRoutes    = require("./routes/comments"),   
    authRoutes       = require("./routes/index");
    
mongoose.connect("mongodb://localhost/yelp_camp_v12", {useMongoClient: true});
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));// __dirname is showing the path that the app is running!!!!
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(flash());
mongoose.Promise = global.Promise;
// seedDB(); //seeding the database

//PASSPORT CONFIGURATION
app.use(session({  //https://ewiggin.gitbooks.io/expressjs-middleware/content/express-session.html
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize()); //http://www.passportjs.org/docs/configure
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));//https://github.com/saintedlama/passport-local-mongoose
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//OUR MIDDLEWARE TO ADD THE currentUser to all ejs templates together
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use(authRoutes);

//=====DONE WITH PASSPORT=======//

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Started");
});


