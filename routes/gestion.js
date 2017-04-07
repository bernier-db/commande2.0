var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var Meal = require('../models/meal');
var Order = require('../models/order');
var Category = require('../models/categories');



router.get('/', function (req, res, next) {
    var meals, orders, categories;

    Meal.getMeals(function (err, m) {
        if (err) {
            console.log('ERREUURRRRRRRRRRRRRRR', err);
        }

        Order.getOrders(function (err, o) {
            if (err) {
                console.log('ERREUURRRRRRRRRRRRRRR', err);
            }
            Category.getCategories(function (err, c) {
                if (err) {
                    console.log('ERREUURRRRRRRRRRRRRRR', err);
                } else
                    res.json({
                        categories: c,
                        meals: m,
                        orders: o
                    });
            });

        });

    });




});


//Add meal
router.post('/addMeal', function (req, res, next) {
    //Get form values
    var name = req.body.name;
    var price = req.body.price;
    var description = req.body.description;
    var available = req.body.available == "true" ? true : false;
    var category = req.body.category;
    var image = req.body.image;


    //Meal object
    var newMeal = new Meal({
        name: name,
        price: price,
        description: description,
        available: available,
        category: category,
        image: image
    });
    console.log(newMeal);
    Meal.addMeal(newMeal, function (err, meal) {
        if (err) {
            console.log(err);
        }
        res.location('/#!/gestion');
        res.redirect('/#!/gestion');
    });

});


//Add order
router.post('/addOrder', function (req, res, next) {
    //Get form values
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
    console.log(newOrder);


    Order.addOrder(newOrder, function (err, order) {
        if (err) {
            console.log(err);
        }
        res.location('/#!/gestion');
        res.redirect('/#!/gestion');
    });


});

//Add category
router.post('/addCategory', function (req, res, next) {
    //Get form values
    var name = req.body.name;

    //Category object
    var newCategory = new Category({
        name: name,

    });

    Category.addCategory(newCategory, function (err, category) {
        if (err) {
            console.log(err);
        }
        res.location('/#!/gestion');
        res.redirect('/#!/gestion');
    });

});

module.exports = router;