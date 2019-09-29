const mysql = require('mysql');
var connection = mysql.createConnection({
    host: "bagdrop.chzzw5vv4mkw.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "BagDrop1234",
    database: "BagDrop",
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