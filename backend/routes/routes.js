var express = require('express');
var router = express.Router();

var restriction_controller = require('../Controllers/RestrictionController.js');

// Middleware to get this shit working
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
  });

router.get('/getRestrictions', function(req, res) {
    restriction_controller.getRestrictions(req, res);
})

router.get('/getRestaurants', function (req, res) {
    restriction_controller.getRestaurants(req, res);
})

router.get('/getReviews/:restaurantId', function (req, res) {
    restriction_controller.getReviews(req, res);
})

router.get('/getMenu/:menuId', function (req, res) {
    restriction_controller.getMenu(req, res);
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