var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json({ type: '*/*' }));
var restriction_controller = require('../Controllers/RestrictionController.js');
var customer_controller = require('../Controllers/CustomerController.js');
var owner_controller = require('../Controllers/OwnerController.js');

// Middleware to get this shit working
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});



// ===Restriction Endpoints ===

router.get('/getRestrictions', function (req, res) {
    restriction_controller.getRestrictions(req, res);
})

router.get('/getAllRestaurants', function (req, res) {
    restriction_controller.getAllRestaurants(req, res);
})

router.get('/getAllRestaurantNames', function (req, res) {
    restriction_controller.getAllRestaurantNames(req, res);
})

router.get('/getRestaurantsByLocationTag/:locationTag', function (req, res) {
    var locationTag = req.params.locationTag;
    restriction_controller.getRestaurantsByLocationTag(req, res, locationTag);
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

router.get('/getFoodItemsIngredientsByMenu/:menuId', function (req, res) {
    let menuId = req.params.menuId;
    restriction_controller.GetFoodItemsOfMenu(req, res, menuId);
})

router.get('/getFoodItemsIngredientsByRestaurantId/:restaurantId', function (req, res) {
    let restaurantId = req.params.restaurantId;
    restriction_controller.GetFoodItemsOfMenuByRestaurantId(req, res, restaurantId);
})

router.get('/getRestaurantsWithAvgMenuPrice/:avgPrice', function (req, res) {
    let avgPrice = req.params.avgPrice;
    restriction_controller.GetRestaurantsWithAvgMenuPrice(req, res, avgPrice);
})

router.get('/getRestaurantById/:restaurantId', function (req, res) {
    let restaurantId = req.params.restaurantId;
    restriction_controller.getRestaurantById(req, res, restaurantId);
})

router.get('/getRestaurantsWithAtLeastXItemsCustomerCanEat/:username/:numItems', function (req, res) {
    let username = req.params.username;
    let numItems = req.params.numItems;
    restriction_controller.getRestaurantsWithAtLeastXItemsCustomerCanEat(req, res, username, numItems);
})

// === CUSTOMER ENDPOINTS ===

router.get('/getReviewsByCustomer/:username', function (req, res) {
    let username = req.params.username;
    customer_controller.getReviewsByCustomer(req, res, username);
});

router.post('/postCustomerRestrictions', function (req, res) {
    let restrictions = req.body
    let custUsername = req.user.username;
    // console.log("body: " + JSON.stringify(body));
    customer_controller.postCustomerRestrictions(req, res, restrictions, custUsername)
    res.redirect(`/main?username=${custUsername}`);
});

router.post('/postUserReview', function (req, res) {
    let content = req.body.content;
    let customerUsername = req.body.customerUsername;
    let restaurantId = req.body.restaurantId;
    customer_controller.postUserReview(req, res, customerUsername, content, restaurantId);
})

router.get('/getMostReliableReview/:restaurantId', function (req, res) {
    let restaurantId = req.params.restaurantId;
    customer_controller.getMostReliableReview(req, res, restaurantId);
});

router.get('/getReviewsAboveXAndWithHigestUpvotes/:threshold', function (req, res) {
    let threshold = req.params.threshold;
    customer_controller.getReviewsAboveXAndWithHigestUpvotes(req, res, threshold);
})

// === OWNER ENDPOINTS ===

router.post('/deleteRestaurant/:restaurantId', function (req, res) {
    let restaurantId = req.params.restaurantId;
    owner_controller.deleteRestaurant(req, res, restaurantId);
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