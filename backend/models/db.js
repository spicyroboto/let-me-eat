// Database wrapper for our mysql db. To establish connection and use
// the db just 'require' this file
var mysql = require('mysql');
var db_config = {
    connectionLimit: 10,
    host: 'us-cdbr-iron-east-03.cleardb.net',
    user: 'b2b7ed699e4b86',
    password: 'edb631a1',
    database: 'heroku_e52fec4ca086f6b'
}

// Pooling the connection to db rather than managing each connection one-by-one
var connection = mysql.createPool(db_config); 

module.exports = connection