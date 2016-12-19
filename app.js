var express    = require("express"),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    app        = express();

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

app.get('/', function(req, res) {
    res.render("landing");
});

// var campgrounds = [
//     {name: "Salmon Creek", image: "http://www.survivalcentral.ca/wp-content/uploads/2015/03/camping_fullsize_story1.jpg"},
//     {name: "Granite Hill", image: "http://travelchannel.sndimg.com/content/dam/images/travel/fullrights/2016/01/14/national-park-camping/camping-voyageurs-national-park-tent.jpg.rend.tccom.1280.960.jpeg"},
//     {name: "Swag Mountain", image: "http://travelhainan.org/wp-content/uploads/2016/01/camping.jpg"}
// ];

app.get('/campgrounds', function(req, res) {
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render('index', {campgrounds: allCampgrounds});
        }
    })
});

app.post('/campgrounds', function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    // Create new campground and save to db
    Campground.create(newCampground, function(err, newlyCreated) {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/campgrounds');            
        }
    })
});

app.get('/campgrounds/new', function(req, res) {
    res.render("new.ejs");
});

// SHOW - shows more info
app.get('/campgrounds/:id', function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            res.render("show", {campground: foundCampground});
        }
    })
});

app.listen(3000, function() {
    console.log("yelpcamp server started.");
});