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

// exports.setCustomerRestrictions = function (req, res, restrictions) {
//     var listOfRestrictions = restrictions;

// }