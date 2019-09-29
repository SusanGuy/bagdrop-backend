const express = require("express");
const router = express.Router();
const connection = require('../connection.js');


//Get all users
router.get("/", (req, res) => {
    connection.query("SELECT * FROM users", (err, rows) => {
        if (!err) res.send(rows);
        else console.log(err);
    });
});
//Get an user
router.get('/:id', (req, res) => {
    connection.query('SELECT * FROM users WHERE user_id= ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Delete an user
router.delete('/:id', (req, res) => {
    connection.query('DELETE FROM users WHERE user_id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});

//Insert an user
router.post('/', (req, res) => {
    connection.query('INSERT INTO users SET ?', req.body, (error, result) => {
        if (error) throw error;

        res.status(201).send(`User added with ID: ${result.insertId}`);
    });
});

//Update an user
router.put('/:id', (req, res) => {
    const id = req.params.id;

    connection.query('UPDATE users SET ? WHERE user_id = ?', [req.body, id], (error, result) => {
        if (error) throw error;

        res.send('User updated successfully.');
    });
});



module.exports = router;