var db = require('../models/db')

exports.getRestrictions = function (req, res) {
    db.query("SELECT * FROM RESTRICTION", function (err, result, fields) {
        if (err) throw err;
        res.send(result);
        });
};

exports.getAllRestaurants = function (req, res) {
    var query = `SELECT r.restaurantId, r.name, r.cuisine, r.username as owner, dt.diningTypeName, 
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
    var query = `SELECT r.restaurantId, r.name, r.cuisine, r.username as owner, dt.diningTypeName, c.phoneNo, c.email, c.streetName, c.city, c.province, a.postalCode, a.locationTag
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
    var query = `SELECT r.restaurantId, r.name, r.cuisine, r.username as owner, dt.diningTypeName, 
    c.phoneNo, c.email, c.streetName, c.city, c.province, a.postalCode, a.locationTag
    FROM Restaurant r
    join dining_type dt on dt.diningTypeId = r.diningTypeId
    join contact_info c on c.restaurantId = r.restaurantId
    join address a on a.streetName = c.streetName
    WHERE r.restaurantId = ${restaurantId}`;
    db.query(query, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
        });
};

exports.getRestaurantsWithAtLeastXItemsCustomerCanEat = function (req, res, username, numItems) {
    console.log("calling: getRestaurantsWithAtLeastXItemsCustomerCanEat" + username + numItems );
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
        // console.log(result);
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
    var query = `select m.menuId, m.menuType, f.foodItemId, f.name as foodItemName, f.calories, f.price, 
    i.ingredientId, i.ingredientName, r.restrictionId, r.name
    from menu m
    join part_of p on p.menuId = m.menuId
    join food_item f on f.foodItemId = p.foodItemId
    join food_item_ingredients fi on fi.foodItemId = f.foodItemId
    join ingredient i on i.ingredientId = fi.ingredientId
    join restriction_applies_to_ingredient ri on ri.ingredientId = i.ingredientId
    join restriction r on r.restrictionId = ri.restrictionId
    where m.menuId = ${menuId}`;
    db.query(query, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
        });
};

exports.GetFoodItemsOfMenuByRestaurantId = function (req, res, restaurantId) {
    var query = `select res.restaurantId, m.menuId, m.menuType, f.foodItemId, f.name as foodItemName, f.calories, f.price, 
    GROUP_CONCAT(distinct i.ingredientName separator ', ') as ingredients, 
    GROUP_CONCAT(distinct r.name separator ', ') as restrictions
    from restaurant res
    join offered_items o on o.restaurantId = res.restaurantId
    join menu m on m.menuId = o.menuId
    join part_of p on p.menuId = m.menuId
    join food_item f on f.foodItemId = p.foodItemId
    join food_item_ingredients fi on fi.foodItemId = f.foodItemId
    join ingredient i on i.ingredientId = fi.ingredientId
    left join restriction_applies_to_ingredient ri on ri.ingredientId = i.ingredientId
    left join restriction r on r.restrictionId = ri.restrictionId
    where res.restaurantId = ${restaurantId}
    group by foodItemId`;
    db.query(query, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
        });
};

exports.GetRestaurantsWithAvgMenuPrice = function (req, res, avgPrice)  {
    var query = `SELECT r.restaurantId, r.name, r.cuisine, r.username as owner, dt.diningTypeName, 
    c.phoneNo, c.email, c.streetName, c.city, c.province, a.postalCode, a.locationTag
    FROM Restaurant r
    join dining_type dt on dt.diningTypeId = r.diningTypeId
    join contact_info c on c.restaurantId = r.restaurantId
    join address a on a.streetName = c.streetName
    join offered_items o on o.restaurantId = r.restaurantId
    join menu m on o.menuId = m.menuId
    join part_of p on p.menuId = o.menuId
    join food_item f on p.foodItemId = f.foodItemId
    group by r.restaurantId
    having avg(f.price) <= ${avgPrice}`;
    db.query(query, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
        });
}



