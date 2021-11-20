var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log('here',db.any);
    db.any('SELECT * FROM products')
        .then(function (data) {
            console.log('data is here', data);
            // success;
            res.json(data);
        })
        .catch(function (error) {
            console.log('eeror', error);
            res.status(400).send(error)
        });
});


module.exports = router;
