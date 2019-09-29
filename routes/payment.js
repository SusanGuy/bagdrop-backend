const express = require("express");
const router = express.Router();
const connection = require('../connection.js');


//Get all payments
router.get("/", (req, res) => {
    connection.query("SELECT * FROM payment", (err, rows) => {
        if (!err) res.send(rows);
        else console.log(err);
    });
});
//Get a payment
router.get('/:id', (req, res) => {
    connection.query('SELECT * FROM payment WHERE payment_id= ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Delete a payment
router.delete('/:id', (req, res) => {
    connection.query('DELETE FROM payment WHERE payment_id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});

//Insert a payment
router.post('/', (req, res) => {
    connection.query('INSERT INTO payment SET ?', req.body, (error, result) => {
        if (error) throw error;

        res.status(201).send(`Payment added with ID: ${result.insertId}`);
    });
});





module.exports = router;