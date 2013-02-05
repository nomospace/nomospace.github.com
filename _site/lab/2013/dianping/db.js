var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'host',
  port: 'port',
  database: 'database',
  user: 'user',
  password: 'password'
});

exports.connect = function() {
  connection.connect();
};

exports.executeSql = function(sql) {
  connection.query(sql, function(err, rows, fields) {
    if (err) throw err;
//    console.log('The solution is: ', rows[0]);
  });
};

exports.end = function() {
  connection.end();
};

