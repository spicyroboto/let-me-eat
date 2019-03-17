var db = require('../models/db')
var body_parser = require('body-parser');

exports.getReviewsByCustomer = function (req, res, username) {
    console.log(username);
    var query = "select c.username, u.upvotes, u.reliabilityIndex, u.comments from user_review u join customer_user c on c.username = u.username where c.username = " + username;
    console.log(query);
    db.query(query, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
        });
};

 exports.postCustomerRestrictions = function (req, res, restrictions, customerUsername) {
    var listOfRestrictions = restrictions;
    var tuplesToInsert = "";
    var i;
    for (i = 0; i < listOfRestrictions.length; i++) {
        tuplesToInsert += `('${customerUsername}', '${listOfRestrictions[i]}'),`;
    }
    tuplesToInsert = tuplesToInsert.slice(0, -1);
    var query = "insert into customer_cannot_eat (username, restrictionId) values " + tuplesToInsert;
    console.log(query);
    db.query(query, function (err, result, fields) {
        if (err) {
            console.log(err);
            throw err;
        }
        res.send(result);
        });
}

exports.postUserReview = function(req, res, customerUsername, content, restaurantId) {
    var query = `INSERT INTO user_review
    (upvotes, reliabilityIndex, comments, datePosted, username, restaurantId)
    VALUES(0, 'Undecided', '${content}', NOW(), '${customerUsername}', ${restaurantId});`
    console.log(query);
    db.query(query, function (err, result, fields) {
        if (err) {
            console.log(err);
            throw err;
        }
        res.send(result);
        });
}

exports.getMostReliableReview = function(req, res, restaurantId) {
    var query = `select * from user_review where ALL ()`;
}