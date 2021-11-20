var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET sales */
router.get('/', function (req, res, next) {
    db.any('SELECT * FROM sales')
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

/* create sale */
router.post('/sale', function (req, res, next) {
    console.log('created sale');
    var product = req.body.product;
    var salesperson = req.body.salesperson
    var customer = req.body.customer;
    var salesDate = parseInt(req.body.salesDate);

    console.log(salesDate);


    db.one('INSERT INTO sales(product, salesperson,customer,salesDate) VALUES($1, $2, $3, $4) RETURNING id', [product,salesperson,customer,salesDate])
        .then(() => {
            console.log("SUCCESFULLY CREATED USER"); // print new user id;
            res.send('success')
        })
        .catch(function (error) {
            console.log('ERROR:', error); // print error;
            res.status(400).send(error)
        });
});


module.exports = router;
