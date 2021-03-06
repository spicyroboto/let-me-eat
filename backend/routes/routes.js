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

router.post('/postUserReview/', function (req, res) {
    let content = req.body.content;
    let customerUsername = req.body.customerUsername;
    let restaurantId = req.body.restaurantId;
    customer_controller.postUserReview(req, res, customerUsername, content, restaurantId);
})

router.get('/postUpvote/:reviewId', function (req, res) {
    let reviewId = req.params.reviewId;
//    let reviewId = req.body.reviewId;
    customer_controller.postUpvote(req, res, reviewId);
})

router.get('/getMostReliableReview/:restaurantId', function (req, res) {
    let restaurantId = req.params.restaurantId;
    customer_controller.getMostReliableReview(req, res, restaurantId);
});

router.get('/getReviewsWithMoreThanXUpvotes/:numOfUpvotes', function (req, res) {
    let numOfUpvotes = req.params.numOfUpvotes;
    customer_controller.getReviewsWithMoreThanXUpvotes(req, res, numOfUpvotes);
})

// === OWNER ENDPOINTS ===

router.post('/deleteRestaurant', function (req, res) {
    let username = req.user.username;
    owner_controller.deleteRestaurant(req, res, username);
})

router.get('/getPopularCustomers', function (req, res) {
    owner_controller.getPopularCustomers(req, res);
})

router.post('/postRestaurant', function (req, res) {
    let a = req.body;
    let restaurantName = req.body.restaurantName;
    let cuisine = req.body.cuisine;
    let username = req.user.username;
    let diningType = req.body.diningType;
    console.log(req.body);
    owner_controller.postRestaurant(req, res, restaurantName, cuisine, username, diningType);
    res.redirect(`/owner-main?username=${username}`)
});

router.post('/postContactInfo', function (req, res) {
    let restaurantId = req.body.restaurantId;
    let phone = req.body.phone;
    let email = req.body.email;
    let street = req.body.street;
    let city = req.body.city;
    let province = req.body.province;
    console.log(req.body);
    owner_controller.postContactInfo(req, res, phone, email, street, city, province, restaurantId);
    // res.redirect(`/owner-main?username=${username}`);
});

router.get('/getRestaurantIdByOwnerUsername/:username', function (req, res) {
    let username = req.params.username;
    restriction_controller.getRestaurantIdByOwnerUsername(req, res, username);
});

// === HOME PAGE ===
// Home page
router.get('/', function (request, response) { 
    response.render('index.html');
});

module.exports = router;