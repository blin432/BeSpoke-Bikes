var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET salesperson. */
router.get('/', function (req, res, next) {
    db.any('SELECT * FROM salespersons')
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
    var firstname = req.body.firstname;
    var lastname = req.body.lastname
    var address = req.body.address;
    var phone = req.body.phone;
    var startdate = req.body.startDate;
    var termdate = req.body.termDate;
    var manager = req.body.manager;

    //check if the unique salesperson exists
    db.any('SELECT * FROM salespersons WHERE firstname = $1 AND lastname = $2 ', [firstname, lastname])
        .then(function (data) {
            console.log(data);
            if (data.length !== 1) {
                // user does not exists!
                res.status(400).send({error: "USER DOES NOT EXISTS"});
            } else {
                db.any('UPDATE salespersons SET address = $1, phone = $2, startdate = $3, termdate = $4, manager = $5 WHERE firstname = $6 AND lastname = $7', [address, phone, startdate, termdate, manager,firstname, lastname])
                 .then(function (data) {
                    console.log('updated data', data);
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
