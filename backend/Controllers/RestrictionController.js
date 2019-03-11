var db = require('../models/db')

exports.getRestrictions = function (req, res) {
    db.query("SELECT * FROM RESTRICTION", function (err, result, fields) {
        if (err) throw err;
        res.send(result);
        });
};

exports.getRestaurants = function (req, res) {
    db.query("SELECT * FROM RESTRICTION", function (err, result, fields) {
        if (err) throw err;
        res.send(result);
        });
};

exports.getReviews = function (req, res) {
    db.query("SELECT * FROM RESTRICTION", function (err, result, fields) {
        if (err) throw err;
        res.send(result);
        });
};

exports.getMenu = function (req, res) {
    db.query("SELECT * FROM RESTRICTION", function (err, result, fields) {
        if (err) throw err;
        res.send(result);
        });
};

