
var mysql = require('mysql');

var dotenv = require('dotenv');

dotenv.config();

const db_config = {
    connectionLimit: 10,
    host: process.env.DATABASE_URL,
    port: 3306,
    user: process.env.DATABASE_USER_DB,
    password: process.env.DATABASE_PASSWORD_DB,
    database: process.env.DATABASE_NAME_DB
};


var pool = mysql.createPool(db_config);



pool.on('connection', function (connection) {

    console.log('connected to db' + connection);
});


pool.on('remove', function (connection) {
    console.log('Database connection closed');
});



module.exports = pool;

