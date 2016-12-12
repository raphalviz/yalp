var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get('/', function(req, res) {
    res.render("landing");
});

var campgrounds = [
    {name: "Salmon Creek", image: "http://www.survivalcentral.ca/wp-content/uploads/2015/03/camping_fullsize_story1.jpg"},
    {name: "Granite Hill", image: "http://travelchannel.sndimg.com/content/dam/images/travel/fullrights/2016/01/14/national-park-camping/camping-voyageurs-national-park-tent.jpg.rend.tccom.1280.960.jpeg"},
    {name: "Swag Mountain", image: "http://travelhainan.org/wp-content/uploads/2016/01/camping.jpg"},
    {name: "Salmon Creek", image: "http://www.survivalcentral.ca/wp-content/uploads/2015/03/camping_fullsize_story1.jpg"},
    {name: "Granite Hill", image: "http://travelchannel.sndimg.com/content/dam/images/travel/fullrights/2016/01/14/national-park-camping/camping-voyageurs-national-park-tent.jpg.rend.tccom.1280.960.jpeg"},
    {name: "Swag Mountain", image: "http://travelhainan.org/wp-content/uploads/2016/01/camping.jpg"}
];

app.get('/campgrounds', function(req, res) {
    res.render('campgrounds', {campgrounds: campgrounds});
});

app.post('/campgrounds', function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    res.redirect('/campgrounds');
});

app.get('/campgrounds/new', function(req, res) {
    res.render("new.ejs");
});

app.listen(3000, function() {
    console.log("yelpcamp server started.");
});