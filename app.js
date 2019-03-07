var express = require('express');
var body_parser = require('body-parser');
const authRoutes = require('./backend/routes/auth_routes.js')
const PORT = process.env.PORT || 3000;

// --- INSTANTIATE THE APP
var app = express();

// Database initialization 
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'us-cdbr-iron-east-03.cleardb.net',
    user: 'b2b7ed699e4b86',
    password: 'edb631a1',
    database: 'heroku_e52fec4ca086f6b'
});

// ==== Static files ==== //
// commented out for now to test db connection
// app.use(express.static(__dirname + '/frontend'));

// Configure body-parser for express
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

// --- VIEW LOCATION, SET UP SERVING STATIC HTML
app.set('frontend', __dirname + '/frontend');
app.engine('html', require('ejs').renderFile);
app.set('frontend', 'html');

// ===== ROUTES ===== //
//  app.use(authRoutes);
// ------------------ //


// app.get('/', function(request, response) {
//     response.send("LET ME EAT!!!!");
// });



// app.get('/', function(request, response) {
//     response.render('index.html');
// });

app.get('/', function (request, response) {
    connection.connect(function (err) {
        if (err) throw err;
        connection.query("SELECT * FROM customers", function (err, result, fields) {
            if (err) throw err;
            response.send(result);
        });
    });
});

// --- START THE SERVER 
var server = app.listen(PORT, function () {
    console.log("Listening on port %d", server.address().port);
});
