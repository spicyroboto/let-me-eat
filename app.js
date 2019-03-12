var express = require('express');
var body_parser = require('body-parser');
const passport   = require('passport')
const authRoutes = require('./backend/routes/auth_routes.js')
const PORT = process.env.PORT || 3000;

// --- INSTANTIATE THE APP
var app = express();

// Passport Config
app.use(require('express-session')(
    {
        secret: "First time setting up auth using passport",
        resave: false,
        saveUninitialized: false
    }
));

app.use(passport.initialize());
app.use(passport.session());



// ==== Static files ==== //
app.use(express.static(__dirname + '/frontend'));  // commented out for now to test db connection

// Configure body-parser for express
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

// --- VIEW LOCATION, SET UP SERVING STATIC HTML
app.set('views', __dirname + '/frontend/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

/* Add all routes to their own file then just use
 "app.use([file_name])" */
// ===== ROUTES ===== //
app.use(authRoutes);


app.get('/', function (request, response) {
    response.render('index.html');
});

app.get('/login', function(request, response) {
    response.render('login.html');
});


// --- START THE SERVER 
var server = app.listen(PORT, function () {
    console.log("Listening on port %d", server.address().port);
});
