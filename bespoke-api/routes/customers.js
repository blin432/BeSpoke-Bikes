var express = require('express');
var router = express.Router();
var db = require('../db');

/* get customers */
router.get('/', function (req, res, next) {
    db.any('SELECT * FROM customers')
        .then(function (data) {
            // success;
            res.json(data);
        })
        .catch(function (error) {
            console.log('eeror', error);
            res.status(400).send(error)
        });
});


module.exports = router;
