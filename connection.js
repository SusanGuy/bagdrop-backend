const mysql = require('mysql');
const keys= require('./config/keys')
var connection = mysql.createConnection({
    host: keys.MySQL.host,
    user: keys.MySQL.user,
    password: keys.MySQL.password,
    database: keys.MySQL.database,
    multipleStatements: true
})

connection.connect(err => {
    if (err) {
        console.log(
            "DB connection failed \n Error : " + JSON.stringify(err, undefined, 2)
        );
    } else {
        console.log("Database Connected");
    }
})

module.exports = connection;