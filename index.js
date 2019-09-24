const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

app.use(express.urlencoded({
    extended: false
}));

var mysqlConnection = mysql.createConnection({
    host: 'bagdrop.chzzw5vv4mkw.us-east-2.rds.amazonaws.com',
    user: 'admin',
    password: 'BagDrop1234',
    database: 'BagDrop',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});


app.listen(3000, () => console.log('Express server is runnig at port no : 3000'));


//Get all users
app.get('/users', (req, res) => {
    mysqlConnection.query('SELECT * FROM User', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Get an user
app.get('/users/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM User WHERE user_id= ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Delete an user
app.delete('/users/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM User WHERE user_id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});

//Insert an user
app.post('/users', (req, res) => {
    mysqlConnection.query('INSERT INTO User SET ?', req.body, (error, result) => {
        if (error) throw error;

        res.status(201).send(`User added with ID: ${result.insertId}`);
    });
});

//Update an user
app.put('/users/:id', (req, res) => {
    const id = req.params.id;

    mysqlConnection.query('UPDATE User SET ? WHERE user_id = ?', [req.body, id], (error, result) => {
        if (error) throw error;

        res.send('User updated successfully.');
    });
});