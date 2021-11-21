var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET sales */
// join tables to get data from all three tables to create sale table
router.get('/', function (req, res, next) {
    db.any('SELECT  SUM( products.saleprice * products.commperc) AS Total, salespersons.firstname AS salespersonfirst, salespersons.lastname AS salespersonlast, salesdate FROM sales JOIN products ON sales.products = products.id  JOIN salespersons ON sales.salesperson = salespersons.id GROUP BY salesdate, salespersonfirst, salespersonlast ' )
        .then(function (data) {
            console.log('qsales is here', data);
            // success;
            res.json(data);
        })
        .catch(function (error) {
            console.log('eeror2', error);
            res.status(400).send(error)
        });
});

module.exports = router;
