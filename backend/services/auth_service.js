var LocalStrategy = require('passport-local').Strategy;
var db = require('../models/db');
var bcrypt = require('bcrypt-nodejs');

module.exports = function(passport) {

    // PASSPORT SESSION CONFIG
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session


    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        console.log("SERIALZE:" + JSON.stringify(user));
        done(null, user.email);
    });

    // used to deserialize the user
    passport.deserializeUser(function(email, done) {
        db.query("SELECT username FROM customer_user WHERE email = ? UNION SELECT username FROM owner_user WHERE email = ?",
        [email, email], function(err, rows){
            done(err, rows[0]);
        });
    });

     // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(
        'local-signup-user',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) {
            let username = req.body.username
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            db.query("SELECT * FROM customer_user WHERE email = ?",[email], function(err, rows) {
                if (err)
                    return done(err);
                if (rows.length) {
                    return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
                } else {
                    // if there is no user with that username create the user
                    var newUserMysql = {
                        username: username,
                        email: email,
                        password: bcrypt.hashSync(password, null, null)  // hashes password
                    };

                    var insertQuery = "INSERT INTO customer_user ( username, email, password ) values (?,?,?)";

                    db.query(insertQuery,[newUserMysql.username, newUserMysql.email, newUserMysql.password],function(err, rows) {
                        if (err) return done(err);

                        return done(null, newUserMysql);
                    });
                }
            });
        })
    );

    passport.use(
        'local-signup-owner',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) {
            let username = req.body.username
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            db.query("SELECT * FROM owner_user WHERE email = ?",[email], function(err, rows) {
                if (err)
                    return done(err);
                if (rows.length) {
                    return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
                } else {
                    // if there is no user with that username create the user
                    var newUserMysql = {
                        username: username,
                        email: email,
                        password: bcrypt.hashSync(password, null, null)  // hashes password
                    };

                    var insertQuery = "INSERT INTO owner_user ( username, email, password ) values (?,?,?)";

                    db.query(insertQuery,[newUserMysql.username, newUserMysql.email, newUserMysql.password],function(err, rows) {
                        if (err) return done(err);
                        return done(null, newUserMysql);
                    });
                }
            });
        })
    );

    // Login
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(
        'local-login',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) { // callback with email and password from our form
            db.query("SELECT email, password FROM customer_user WHERE email = ? UNION SELECT email, password FROM owner_user WHERE email = ?",
            [email, email], function(err, rows){
                if (err)
                    return done(err);
                if (!rows.length) {
                    console.log('no user found')
                    return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                }

                // if the user is found but the password is wrong
                if (!bcrypt.compareSync(password, rows[0].password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

                // all is well, return successful user
                return done(null, rows[0]);
            });
        })
    );

}