var db = require('../models/db')
var body_parser = require('body-parser');

exports.deleteRestaurant = function (req, res, restaurantId) {
  console.log(restaurantId);
  var query = "delete from Restaurant where restaurantId = " + restaurantId;
  console.log(query);
  db.query(query, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
      });
};