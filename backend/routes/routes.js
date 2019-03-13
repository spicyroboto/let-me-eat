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

// get all reviews a restaurant has
router.get('/getReviews/:restaurantId', function (req, res) {
    let restaurantId = req.params.restaurantId;
    restriction_controller.getReviews(req, res, restaurantId);
})

// get all menus a restaurant offers
router.get('/getMenus/:restaurantId', function (req, res) {
    let restaurantId = req.params.restaurantId;
    restriction_controller.getMenu(req, res, restaurantId);
})

router.get('/getMenu/:menuId', function (req, res) {
    let menuId = req.params.menuId;
    restriction_controller.getMenu(req, res, menuId);
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