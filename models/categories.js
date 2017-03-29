var mongoose = require('mongoose');
var categorySchema = mongoose.Schema({
    name: {
        type: String,
        index: true,
        required: true
    }
});

var Category = module.exports = mongoose.model('Category', categorySchema);

//get all categories
module.exports.getCategories = function (callback) {
    Category.find(callback);
}

//get categpry by ID
module.exports.getCategoryById = function (id, callback) {
    Category.findById(id, callback);
}


//Create category
module.exports.addCategory = function (newCategory, callback) {
    newCategory.save(callback);
}

//update category
module.exports.updateCategory = function (id, data, callback) {
    var name = data.name;


    Category.findById(id, function (err, category) {
        if (!category) {
            return next(new Error('could not load category'));
        } else {
            //Update
            category.name = name;

            category.save(callback);
        }
    });
}