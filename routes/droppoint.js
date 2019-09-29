const express = require("express");
const router = express.Router();
const connection = require('../connection.js');


//Get all droppoint
router.get("/", (req, res) => {
    connection.query("SELECT * FROM droppoint", (err, rows) => {
        if (!err) res.send(rows);
        else console.log(err);
    });
});
//Get a droppoint
router.get('/:id', (req, res) => {
    connection.query('SELECT * FROM droppoint WHERE drop_id= ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Delete a droppoint
router.delete('/:id', (req, res) => {
    connection.query('DELETE FROM droppoint WHERE drop_id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});

//Insert an drop
router.post('/', (req, res) => {
    connection.query('INSERT INTO droppoint SET ?', req.body, (error, result) => {
        if (error) throw error;

        res.status(201).send(`Droppoint added with ID: ${result.insertId}`);
    });
});

//Update an drop
router.put('/:id', (req, res) => {
    const id = req.params.id;

    connection.query('UPDATE droppoint SET ? WHERE drop_id = ?', [req.body, id], (error, result) => {
        if (error) throw error;

        res.send('Droppoint updated successfully.');
    });
});



module.exports = router;