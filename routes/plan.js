var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var Meal = require('../models/meal');
var Order = require('../models/order');
var Category = require('../models/categories');

/* GET users listing. */
router.get('/', function (req, res, next) {

    res.render('plan');
});

router.get('/getOrders', function (req, res, next) {
    console.log(req.query);
    Order.getOrdersByTable(req.query.tableId, function (err, o) {
        if (err) {
            console.log('ERREUURRRRRRRRRRRRRRR', err);
        }
        console.log(o);
        res.json(o);
    });
});

router.post('/addOrder', function (req, res, next) {
    //Get form values
   console.log("REQ.BODY", req.body);
    var items = req.body.item;

    var table = req.body.table;
    var date = req.body.date;
    var closed = req.body.closed == 'true' ? true : false;
    var waiter = req.body.waiter;

    var commentRest = req.body.commentRes;
    var commentWait = req.body.commentWait;



    //Order object
    var newOrder = new Order({
        "table": table,
        "date": date,
        "closed": closed,
        "waiter": waiter,
        "items": items,
        "commentRest": commentRest,
        "commentWait": commentWait

    });
    console.log("nouvelle commande:", newOrder);


    Order.addOrder(newOrder, function (err, order) {
        if (err) {
            console.log(err);
        }
        res.location(req.body.url);
        res.redirect(req.body.url);
    });


});

module.exports = router;