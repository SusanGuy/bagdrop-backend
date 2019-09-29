const express = require("express");
const router = express.Router();
const connection = require('../connection.js');


//Get all invoice
router.get("/", (req, res) => {
    connection.query("SELECT * FROM invoice", (err, rows) => {
        if (!err) res.send(rows);
        else console.log(err);
    });
});
//Get an invoice
router.get('/:id', (req, res) => {
    connection.query('SELECT * FROM invoice WHERE invoice_id= ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Delete an invoice
router.delete('/:id', (req, res) => {
    connection.query('DELETE FROM invoice WHERE invoice_id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});

//Insert an invoice
router.post('/', (req, res) => {
    connection.query('INSERT INTO invoice SET ?', req.body, (error, result) => {
        if (error) throw error;

        res.status(201).send(`Invoice added with ID: ${result.insertId}`);
    });
});





module.exports = router;