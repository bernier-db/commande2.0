var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var Meal = require('../models/meal');
var Order = require('../models/order');


router.get('/', function (req, res, next) {
    Meal.getMeals(function (err, meals) {
        if (err) {
            console.log(err);
        } 
        Order.getOrders(function (err, orders) {
        if (err) {
            console.log(err);
        } 
            console.log(orders);
        res.json({meals:meals, orders:orders});
    });
        
    });
    
});


//Add meal
router.post('/addMeal', function(req, res, next){
    //Get form values
    var name =          req.body.name;
    var price =         req.body.price;
    var description =   req.body.description;
    var available =     req.body.available=="true" ? true : false;
    var category =      req.body.category;
    var image =         req.body.image;
    
    
    //Meal object
    var newMeal = new Meal({
        name:name,
        price: price,
        description: description,
        available: available,
        category: category,
        image: image
    });
    
    Meal.addMeal(newMeal, function(err, meal){
        if(err){
            console.log(err);
        }
        res.location('/gestion');
        res.redirect('/gestion');
    });
    
});


//Add order
router.post('/addOrder', function(req, res, next){
    //Get form values
    var items = req.body.item;

    var table = req.body.table;
    var date = req.body.date;
    var closed = req.body.closed=='true' ? true : false;
    var waiter = req.body.waiter;
    
/*
   
    if (typeof(req.body.item) === 'object'){    
        req.body.item.forEach(function(item, i){
           var meal = {
                name: item,
                price: req.body.price[i],
                quantity: parseInt(req.body.quantity[i])
            }
            items.push(meal);
    })
    } else {
        var meal = {
                name: req.body.item,
                price: req.body.price,
                quantity: parseInt(req.body.quantity)
            }
            items.push(meal);
    }
 */
    var commentRest = req.body.commentRes;
    var commentWait = req.body.commentWait;
    
    
    
    //Meal object
    var newOrder = new Order({
        "table":table,
        "date":date,
        "closed":closed,
        "waiter":waiter,
        "items":items,
        "commentRest":commentRest,
        "commentWait":commentWait
        
    });
    console.log(newOrder);

    /*
    Order.addOrder(newOrder, function(err, order){
        if(err){
            console.log(err);
        }
        res.location('/#!/gestion');
        res.redirect('/#!/gestion');
    });*/
    
    
});

module.exports = router;