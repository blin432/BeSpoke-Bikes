var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET sales */
// join tables to get data from all three tables to create sale table
router.get('/', function (req, res, next) {
    db.any('SELECT sales.id, products.name, customers.firstname AS customerfirst, customers.lastname AS customerlast, salesdate, products.saleprice, salespersons.firstname AS salespersonfirst, salespersons.lastname AS salespersonlast, products.commperc FROM sales JOIN products ON sales.products = products.id JOIN salespersons ON sales.salesperson = salespersons.id JOIN customers ON sales.customer = customers.id')
        .then(function (data) {
            console.log('data is here', data);
            // success;
            res.json(data);
        })
        .catch(function (error) {
            console.log('eeror2', error);
            res.status(400).send(error)
        });
});

/* create sale by adding foreign keys */
router.post('/sale', function (req, res, next) {
    var product = req.body.product;
    var salesperson = req.body.salesperson
    var customer = req.body.customer;
    var salesDate = req.body.salesDate;


    db.one('INSERT INTO sales(products, salesperson,customer,salesDate) VALUES($1, $2, $3, $4) RETURNING  id, products, salesperson, customer, salesDate', [product,salesperson,customer,salesDate])
        .then((data) => {
            console.log("SUCCESFULLY CREATED SALE"); // print new user id;
            res.json(data);
        })
        .catch(function (error) {
            console.log('ERROR:', error); // print error;
            res.status(400).send(error)
        });
});

/* filter by date*/
router.get('/filterByDate/:date', function (req, res, next) {
    console.log('created sale');
    var filterdate = req.params.date;

    //filter by date after joining all tables and selecting data, filter by WHERE = filterdate
    db.any('SELECT sales.id, products.name, customers.firstname AS customerfirst, customers.lastname AS customerlast, salesdate, products.saleprice, salespersons.firstname AS salespersonfirst, salespersons.lastname AS salespersonlast, products.commperc FROM sales JOIN products ON sales.products = products.id JOIN salespersons ON sales.salesperson = salespersons.id JOIN customers ON sales.customer = customers.id WHERE salesdate = $1',[filterdate])
        .then((data) => {
            //send back sales by filtered by date
            res.json(data);
        })
        .catch(function (error) {
            console.log('ERROR:', error); // print error;
            res.status(400).send(error)
        });
});


module.exports = router;
