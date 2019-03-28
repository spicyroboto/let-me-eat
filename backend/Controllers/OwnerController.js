var db = require('../models/db')
var body_parser = require('body-parser');

exports.deleteRestaurant = function (req, res, username) {
  console.log(username);
  var query = `delete from Restaurant where username = '${username}'`;
  console.log(query);
  db.query(query, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
      });
};