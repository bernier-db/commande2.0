var express = require('express');
var router = express.Router();
var Meal = require('../models/meal');
var Category = require('../models/categories');
router.get('/', function (req, res, next) {

    //Fetch tous les repas
    Meal.getMeals(function (err1, meals) {
        if (err1) {
            console.log(err1);
        } else {
            //fetch categories
            Category.getCategories(function (err2, c) {
                if (err2) {
                    console.log('ERREUURRRRRRRRRRRRRRR', err2);
                } else
                    
                    res.json({
                        categories: c,
                        meals: meals
                    });

            });
        }
    });


});

//route pour description:
router.get('/:id', function (req, res, next) {


    Meal.getMealById(req.params.id, function (err, meal) {
        if (err) {
            console.log(err);
        } else {
            res.json(meal);
        }
    });
    //res.render('menu.html');

});


//route pour categorie
router.get('/category/:category', function (req, res, next) {

    Meal.getMealsByCategory(req.params.category, function (err, meal) {
        if (err) {
            console.log(err);
        } else {
            res.json(meal);
        }
    });
    //res.render('menu.html');

});

module.exports = router;