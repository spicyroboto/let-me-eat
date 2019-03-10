var express = require('express');
var router = express.Router();

var restriction_controller = require('../backend/Controllers/RestrictionController');

// Middleware to get this shit working
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
  });

router.get('/getRestrictions', function(req, res) {
    restriction_controller.getRestrictions(req, res);
})

router.get('/getRestaurants', function (req, res) {
    res.send("Stub for list of restrictions");
})

router.get('/getReviews/:restaurantId', function (req, res) {
    res.send("Stub for list of reviews by restaurant id");
})

router.get('/getMenu/:menuId', function (req, res) {
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
router.get('/', function (request, response) {
    response.render('index.html');
});

module.exports = router;