var express = require('express');
var body_parser = require('body-parser');
const PORT = process.env.PORT || 3000;

// --- INSTANTIATE THE APP
var app = express();

app.use(express.static(__dirname + '/frontend'));

// Configure body-parser for express
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

// --- VIEW LOCATION, SET UP SERVING STATIC HTML
app.set('frontend', __dirname + '/frontend');
app.engine('html', require('ejs').renderFile);
app.set('frontend', 'html');

// --- ROUTING

var router = express.Router();

app.get('/getRestrictions', function (req, res) {
    res.send("Stub for list of restrictions");
})

app.get('/getRestaurants', function (req, res) {
    res.send("Stub for list of restrictions");
})

app.get('/getReviews/:restaurantId', function (req, res) {
    res.send("Stub for list of reviews by restaurant id");
})

app.get('/getMenu/:menuId', function (req, res) {
    res.send("Stub for menu for restaurantby menu id");
})

// app.post('/login', function (req, res) {
//     var username = req.body.user;
//     var password = req.body.password;
//     console.log("username is : " + username + " password is: " + password);
//     res.send("Stub for login: username/password: " + username + "/" + password);
// })

// app.post('/signup', function(req, res) {
//     var email = req.body.email;
//     var username = req.body.username;
//     var password = req.body.password;
// })



// Home page
app.get('/', function (request, response) {
    response.render('index.html');
});

// --- START THE SERVER 
var server = app.listen(PORT, function () {
    console.log("Listening on port %d", server.address().port);
});
