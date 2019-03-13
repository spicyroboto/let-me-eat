var db = require('../models/db')

exports.getRestrictions = function (req, res) {
    db.query("SELECT * FROM RESTRICTION", function (err, result, fields) {
        if (err) throw err;
        res.send(result);
        });
};

exports.getRestaurants = function (req, res) {
    db.query("SELECT * FROM Restaurant, Dining_Type WHERE Restaurant.diningTypeId = Dining_Type.diningTypeId", 
    function (err, result, fields) {
        if (err) throw err;
        res.send(result);
        });
};

exports.getReviews = function (req, res, restaurantId) {
    var query = "SELECT * FROM user_review WHERE restaurantId =" + restaurantId;
    db.query(query, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
        });
};

exports.getMenu = function (req, res, menuId) {
    var query = "SELECT * FROM Menu WHERE menuId = " + menuId; 
    db.query(query, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
        });
};

exports.GetFoodItemsOfMenu = function (req, res, menuId) {
    var query = "select P.menuId, P.foodItemId, F.name as fName, F.calories as cal, F.price from Part_Of P join Food_Item F on F.foodItemId = P.foodItemId join Food_Item_Ingredients Fi on Fi.foodItemId = F.foodItemId join Ingredient I on I.ingredientId = Fi.ingredientId where menuId ="
    + menuId;
    db.query(query, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
        });
};

