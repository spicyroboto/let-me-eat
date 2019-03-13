var db = require('../models/db')

exports.getReviewsByCustomer = function (req, res, username) {
    var query = "SELECT * FROM User_Review Where username = " + username;
    db.query(query, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
        });
};