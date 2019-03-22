var db = require('../models/db')

exports.getRestrictions = function (req, res) {
    db.query("SELECT * FROM RESTRICTION", function (err, result, fields) {
        if (err) throw err;
        res.send(result);
        });
};

exports.getAllRestaurants = function (req, res) {
    var query = `SELECT r.name, r.cuisine, r.username as owner, dt.diningTypeName, 
    c.phoneNo, c.email, c.streetName, c.city, c.province, a.postalCode, a.locationTag
    FROM Restaurant r
    join dining_type dt on dt.diningTypeId = r.diningTypeId
    join contact_info c on c.restaurantId = r.restaurantId
    join address a on a.streetName = c.streetName`
    db.query(query, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
        });
};

exports.getRestaurantsByLocationTag = function (req, res, locationTag) {
    var query = `SELECT r.name, r.cuisine, r.username as owner, dt.diningTypeName, c.phoneNo, c.email, c.streetName, c.city, c.province, a.postalCode, a.locationTag
    FROM Restaurant r
    join dining_type dt on dt.diningTypeId = r.diningTypeId
    join contact_info c on c.restaurantId = r.restaurantId
    join address a on a.streetName = c.streetName
    where a.locationTag = '${locationTag}'`;
    db.query(query, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
        });
}

exports.getAllRestaurantNames = function (req, res) {
    db.query("SELECT name FROM Restaurant", 
    function (err, result, fields) {
        if (err) throw err;
        res.send(result);
        });
};

exports.getRestaurantById = function (req, res, restaurantId) {
    var query = `SELECT * from Restaurant where restaurantId = ${restaurantId}`;
    db.query(query, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
        });
};

exports.getRestaurantsWithAtLeastXItemsCustomerCanEat = function (req, res, username, numItems) {
    var query = `select rrv.restaurantId, rrv.name, rrv.cuisine, rrv.Owner, rrv.diningTypeName,
    rrv.phoneNo, rrv.email, rrv.streetName, rrv.city, rrv.province, rrv.postalCode, rrv.locationTag,
    count(distinct(foodItemId)) as numberOfFoodItemsICanEat
    from restaurantRestrictionsView rrv
    where restrictionId not in (
        select crv.restrictionId
        from customerRestrictionsView crv
        where username = '${username}'
    )
    group by rrv.restaurantId
    having count(distinct(foodItemId)) > ${numItems}`;
    db.query(query, function (err, result, fields) {
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

exports.GetRestaurantsWithAvgMenuPrice = function (req, res, avgPrice)  {
    var query = `select o.restaurantId, p.menuId, avg(f.price) as avgPriceOfMenu
    from part_of p
    join food_item f on p.foodItemId = f.foodItemId
    join offered_items o on p.menuId = o.menuId
    group by o.restaurantId, p.menuId
    having avg(f.price) < ${avgPrice}`;
    db.query(query, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
        });
}



