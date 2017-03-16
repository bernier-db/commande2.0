var mongoose = require('mongoose');
var mealSchema = mongoose.Schema({
    name: {
        type: String,
        index: true,
        required: true
    },
    price: {
        type: String,
        index: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        index: true,
        required: true
    },
    category: {
        type: String,
        index: true,
        required: true
    },
    image: {
        type: String,
        index: true,
        required: true
    }
});

var Meal = module.exports = mongoose.model('Meal', mealSchema);

//get all meals
module.exports.getMeals = function (callback) {
    Meal.find(callback);
}

//get meal by ID
module.exports.getMealById = function (id, callback) {
    Meal.findById(id, callback);
}

//Get category meals
module.exports.getMealsByCategory = function (category, callback) {
    var query = {
        category: category
    };

    Meal.find(query, callback);

}

//Create meal
module.exports.addMeal = function (newMeal, callback) {
    newMeal.save(callback);
}

//update meal
module.exports.updateMeal = function (id, data, callback) {
    var name = data.name;
    var price = data.price;
    var description = data.description;
    var available = data.available;
    var category = data.category;
    var image = data.image;

    Meal.findById(id, function (err, meal) {
        if (!meal) {
            return next(new Error('could not load meal'));
        } else {
            //Update
            meal.name = name;
            meal.price = price;
            meal.description = description;
            meal.available = available;
            meal.category = category;
            meal.image = image;
            
            meal.save(callback);
        }
    });
}