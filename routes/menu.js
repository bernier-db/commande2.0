var express = require('express');
var router = express.Router();
var Meal = require('../models/meal');

router.get('/', function(req, res, next) {
    
    //Fetch tous les repas
    Meal.getMeals(function(err, meals){
        if(err) {
            console.log(err);
        } else {
            //res.json(meals);
            res.render('./menu');
        }
    });
    
  
});

//route pour description:
router.get('/:id', function(req, res, next) {
    
    
    Meal.getMealById(req.params.id, function(err, meal){
        if(err) {
            console.log(err);
        } else {
            res.json(meal);
        }
    });
    //res.render('menu.html');
  
});


//route pour categorie
router.get('/category/:category', function(req, res, next) {
      
    Meal.getMealsByCategory(req.params.category, function(err, meal){
        if(err) {
            console.log(err);
        } else {
            res.json(meal);
        }
    });
    //res.render('menu.html');
  
});

module.exports = router;