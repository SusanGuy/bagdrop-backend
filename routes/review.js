const express = require("express");
const router = express.Router();
const connection = require('../connection.js');


//Get all user_reviews
router.get("/", (req, res) => {
    connection.query("SELECT * FROM user_reviews", (err, rows) => {
        if (!err) res.send(rows);
        else console.log(err);
    });
});
//Get an review
router.get('/:id', (req, res) => {
    connection.query('SELECT * FROM user_reviews WHERE user_review_id= ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Delete an review
router.delete('/:id', (req, res) => {
    connection.query('DELETE FROM user_reviews WHERE user_review_id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});

//Insert an review
router.post('/', (req, res) => {
    connection.query('INSERT INTO user_reviews SET ?', req.body, (error, result) => {
        if (error) throw error;

        res.status(201).send(`Review added with ID: ${result.insertId}`);
    });
});

//Update an review
router.put('/:id', (req, res) => {
    const id = req.params.id;

    connection.query('UPDATE user_reviews SET ? WHERE user_review_id = ?', [req.body, id], (error, result) => {
        if (error) throw error;

        res.send('Review updated successfully.');
    });
});



module.exports = router;