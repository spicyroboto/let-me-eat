var express = require('express');
var router = express.Router();
var db = require('../models/db')

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

module.exports = {
    router,
    authenticate: function (passport) {
        // show the signup form
        router.get('/signup', function (req, res) {
            // render the page and pass in any flash data if it exists
            res.render('dummySignUp.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        router.post('/signup', passport.authenticate('local-signup', {
            successRedirect: '/', // redirect to the secure profile section
            failureRedirect: '/signup', 
            failureFlash: true // allow flash messages
        }));

    // Login
	// show the login form
	router.get('/login', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('login.html', { message: req.flash('loginMessage') });
	});

	// process the login form
	router.post('/login', passport.authenticate('local-login', {
            successRedirect : '/', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
		}),
        function(req, res) {
            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
        res.redirect('/');
    });
    }
}


