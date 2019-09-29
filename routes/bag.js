const express = require("express");
const router = express.Router();
const connection = require('../connection.js');


//Get all bag
router.get("/", (req, res) => {
    connection.query("SELECT * FROM bag", (err, rows) => {
        if (!err) res.send(rows);
        else console.log(err);
    });
});
//Get an bag
router.get('/:id', (req, res) => {
    connection.query('SELECT * FROM bag WHERE bag_id= ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Delete an bag
router.delete('/:id', (req, res) => {
    connection.query('DELETE FROM bag WHERE bag_id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});

//Insert an bag
router.post('/', (req, res) => {
    connection.query('INSERT INTO bag SET ?', req.body, (error, result) => {
        if (error) throw error;

        res.status(201).send(`Bag added with ID: ${result.insertId}`);
    });
});

//Update an bag
router.put('/:id', (req, res) => {
    const id = req.params.id;

    connection.query('UPDATE bag SET ? WHERE bag_id = ?', [req.body, id], (error, result) => {
        if (error) throw error;

        res.send('Bag updated successfully.');
    });
});



module.exports = router;