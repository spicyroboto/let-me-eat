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

exports.postContactInfo = function (req, res, phone, email, street, city, province) {
  var restaurantId;
  var queryRestaurantId = `SELECT restaurantId from restaurant where username = 'ocOwner'`
  db.query(queryRestaurantId, function(err, result, fields) {
    if (err) throw err;
    restaurantId = result[0].restaurantId;
    console.log(restaurantId);
    var queryContact = `INSERT INTO heroku_e52fec4ca086f6b.contact_info
        (phoneNo, email, streetName, city, province, restaurantId)
        VALUES('${phone}', '${email}', '${street}', '${city}', '${province}', ${restaurantId});`
    console.log(queryContact);
  });

  
  // db.query(query, function (err, result, fields) {
  //     if (err) {
  //       throw err;
  //     }      
  //   });
} 
  