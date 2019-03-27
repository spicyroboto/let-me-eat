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


module.exports = {
    router,
    authenticate: function (passport) {
        // determine which user to create
        router.get('/signup', function (req, res) {
            // render the page and pass in any flash data if it exists
            res.render('signup.html');
        });

        // show the signup form 
        router.get('/signup-user', function (req, res) {
            // render the page and pass in any flash data if it exists
            res.render('signup-user.html', { message: req.flash('signupMessage') });
        });

        // process the signup form for new customer
        router.post('/signup-user', passport.authenticate('local-signup-user', {
            successRedirect: '/restrictions', // redirect to the secure profile section
            failureRedirect: '/signup-user',
            failureFlash: true // allow flash messages
        }));

        // show the signup form 
        router.get('/signup-owner', function (req, res) {
            // render the page and pass in any flash data if it exists
            res.render('signup-owner.html', { message: req.flash('signupMessage') });
        });

        // process the signup form for new restaurant owner
        router.post('/signup-owner', passport.authenticate('local-signup-owner', {
            successRedirect: '/owner-restaurant', // redirect to the secure profile section
            failureRedirect: '/signup-owner',
            failureFlash: true // allow flash messages
        }));

        // Login
        // show the login form
        router.get('/login', function (req, res) {
            // render the page and pass in any flash data if it exists
            res.render('login.html', { message: req.flash('loginMessage') });
        });

        // process the login form
        router.post('/login', passport.authenticate('local-login', {
            successRedirect: '/main', // redirect to the secure profile section
            failureRedirect: '/login', // redirect back to the signup page if there is an error
            failureFlash: true // allow flash messages
        }),
            function (req, res) {
                if (req.body.remember) {
                    req.session.cookie.maxAge = 1000 * 60 * 3;
                } else {
                    req.session.cookie.expires = false;
                }
                res.redirect('/');
            });
    },
    isLoggedIn: function(req, res, next){
        if(req.isAuthenticated()) {
          return next();
        }
        res.redirect('/login');
      }
}


