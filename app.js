var express = require('express');
var body_parser = require('body-parser');
const passport   = require('passport')
const authRoutes = require('./backend/routes/auth_routes.js')
var flash    = require('connect-flash');
const PORT = process.env.PORT || 3000;

// --- INSTANTIATE THE APP
var app = express();

// Passport Config
require('./backend/services/auth_service')(passport);
app.use(require('express-session')(
    {
        secret: "First time setting up auth using passport",
        resave: false,
        saveUninitialized: false
    }
));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());   // displays flash messages in user session
app.use(function(req, res, next){
    req.user ? res.locals.username = req.user.username : res.locals.username = req.user;
    next();
  })


// ==== Static files ==== //
app.use(express.static(__dirname + '/frontend'));  // commented out for now to test db connection

// Configure body-parser for express
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

// --- VIEW LOCATION, SET UP SERVING STATIC HTML
app.set('views', __dirname + '/frontend/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// --- ROUTING
app.use(require('./backend/routes/routes.js'));

// ===== ROUTES ===== //
app.use(authRoutes.router);
require('./backend/routes/auth_routes').authenticate(passport) // use configured passport to authenticate


app.get('/', function (request, response) {
    console.log(request.body);
    response.render('index.html');
});

// app.get('/login', function(request, response) {
//     response.render('login.html');
// });

app.get('/createaccount', function (request, response) {
    response.render('signup.html');
});

// app.get('/signup-user', function (request, response) {
//     response.render('signup-user.html');
// });

app.get('/restrictions', authRoutes.isLoggedIn, function (request, response) {
    response.render('user-restrictions.html');
});

app.get('/restaurant', authRoutes.isLoggedIn, function (request, response) {
    response.render('restaurant.html');
});

app.get('/main', function (request, response) {
    console.log(request.params)
    if(request.user) console.log(JSON.stringify(request.user))
    response.render('main.html');
});


// --- START THE SERVER 
var server = app.listen(PORT, function () {
    console.log("Listening on port %d", server.address().port);
});
