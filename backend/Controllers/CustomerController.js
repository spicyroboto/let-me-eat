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
    var listOfRestrictions = Object.values(restrictions);
    var tuplesToInsert = "";
    var i;
    for (i = 0; i < listOfRestrictions.length; i++) {
        tuplesToInsert += `('${customerUsername}', ${listOfRestrictions[i]}),`;
    }
    tuplesToInsert = tuplesToInsert.slice(0, -1);
    var query = "insert into customer_cannot_eat (username, restrictionId) values " + tuplesToInsert;
    console.log(query);
    db.query(query, function (err, result, fields) {
        if (err) {
            console.log(err);
            throw err;
        }
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

exports.postUpvote = function(req, res, reviewId) {
    var query = `select upvotes from user_review where reviewId = ${reviewId};`
    console.log(query);

    db.query(query, function (err, result, fields) {
        if (err) {
            console.log(err);
            throw err;
        }
        var upvote_count = result[0].upvotes;

        query1 = `update user_review set upvotes = ${upvote_count + 1} where reviewId = ${reviewId};`
        console.log(query1);
        db.query(query1, function (err1, result1, fields) {
            if (err1) {
                console.log(err1);
                throw err1;
            }

            //res.send(result1);
            });

        res.send(result);
        });
}

exports.getMostReliableReview = function(req, res, restaurantId) {
    var query = `select * from user_review ur, restaurant r 
    where ur.restaurantId = r.restaurantId and r.restaurantId=${restaurantId}
    and ur.upvotes >= all(select ur2.upvotes 
        from user_review ur2, restaurant r2 
        where ur2.restaurantId=r2.restaurantId and r2.restaurantId=${restaurantId});`;
    console.log(query);
    db.query(query, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
        });
}

exports.getReviewsWithMoreThanXUpvotes = function(req, res, numOfUpvotes) {
    // not sure about this query
    var query = `select * from user_review 
    where upvotes >= ${numOfUpvotes};`
    console.log(query);
    db.query(query, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
        });
}