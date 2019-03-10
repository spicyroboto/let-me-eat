var express     = require('express');
var router      = express.Router();
var db          = require('../models/db')

// No routes added yet, just testing db connection
router.get('/db', function (request, response) {
    db.query("SELECT * FROM customers", function (err, result, fields) {
        if (err) throw err;
        response.send(result);
    });
});

// router.get('/', function(request, response) {
//     response.render('index.html');
// });
 
module.exports = router;
