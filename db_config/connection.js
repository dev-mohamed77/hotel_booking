

var pool = require("../db_config/pool.js");



exports.db_query = function (query, value) {

    return new Promise((resolve, reject) => {

        pool.getConnection(function (err, connection) {
            console.log(err);

            if (err) {
                return reject(err);
            }
            connection.query(query, value, (err, rows) => {
                connection.release();
                if (err) {
                    return reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    });
}








