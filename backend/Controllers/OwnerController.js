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

exports.getPopularCustomers = function (req, res) {
  var query = `select c.username from customer_user c where not exists(
    (select r.restaurantid from restaurant r where r.restaurantid NOT IN (select ur.restaurantid from user_review ur where c.username = ur.username)));`;
  console.log(query);
  db.query(query, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
      });
};

exports.postRestaurant = function (req, res, restaurantName, cuisine, username, diningType) {
  var query = `INSERT INTO restaurant
  (name, cuisine, username, diningTypeId)
  VALUES('${restaurantName}', '${cuisine}', '${username}', ${diningType})
  `
  console.log(query);
  db.query(query, function (err, result, fields) {
      if (err) {
        throw err;
      }      
    });
} 

exports.postContactInfo = function (req, res, phone, email, street, city, province, restaurantId) {
  var query = `INSERT INTO heroku_e52fec4ca086f6b.contact_info
        (phoneNo, email, streetName, city, province, restaurantId)
        VALUES('${phone}', '${email}', '${street}', '${city}', '${province}', ${restaurantId});`
  // var queryRestaurantId = `SELECT restaurantId from restaurant where username = 'rm'`
  db.query(query, function(err, result, fields) {
    if (err) throw err;
  });
}

exports.getRestaurantIdByOwnerUsername = function (req, res, username) {
    console.log(username);
    var query = "select c.username, u.upvotes, u.reliabilityIndex, u.comments from user_review u join customer_user c on c.username = u.username where c.username = " + username;
    console.log(query);
    db.query(query, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
        });
};
  
  // db.query(query, function (err, result, fields) {
  //     if (err) {
  //       throw err;
  //     }      
  //   });

  