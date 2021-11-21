var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET Products */
router.get('/', function (req, res, next) {
    db.any('SELECT * FROM products')
        .then(function (data) {
            // success;
            res.json(data);
        })
        .catch(function (error) {
            console.log('eeror', error);
            res.status(400).send(error)
        });
});


//update a salesperson
router.put('/update', function (req, res, next) {
    var name = req.body.name;
    var manufacturer = req.body.manufacturer
    var style = req.body.style;
    var purchaseprice = req.body.purchPrice;
    var saleprice = parseInt(req.body.saleprice);
    var qtyhand = parseInt(req.body.qty);
    var commperc = parseFloat(req.body.commperc);
    console.log('comm',commperc);



    //check if the unique salesperson exists
    db.any('SELECT * FROM products WHERE name = $1 ', [name])
        .then(function (data) {
            console.log(data);
            if (data.length !== 1) {
                // product does not exists!
                res.send({ message: 'product does not exist' })
                res.status(400).send({error: "USER DOES NOT EXISTS"});
            } else {
                //if it does exist update
                db.any('UPDATE products SET manufacturer = $1, style = $2, purchaseprice = $3, saleprice = $4, qtyhand= $5, commperc = $6 WHERE name = $7 ', [manufacturer, style, purchaseprice, saleprice, qtyhand ,commperc, name])
                 .then(function (data) {
                    // success;
                    res.json(data);
                })
                .catch(function (error) {
                    console.log('eeror', error);
                    res.status(400).send(error)
                });
            }    
        })
});


module.exports = router;
