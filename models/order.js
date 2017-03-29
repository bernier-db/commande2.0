var mongoose = require('mongoose');
var orderSchema = mongoose.Schema({
    table: {
        type: Number,
        index: true,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    closed: {
        type: Boolean,
        index: true,
        required: true
    },
    waiter: {
        type: String
    },
    items : [{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Meal'
        }],
    
    commentRest: {
        type: String
    },
    commentWait: {
        type: String
    },
});

var Order = module.exports = mongoose.model('Order', orderSchema);

//get all orders
module.exports.getOrders = function(callback) {
    Order.find(callback).populate('items');
}

//get order by ID
module.exports.getOrderById = function(id, callback){
    Order.findById(id, callback).populate('items');
    
}
//get order by date
module.exports.getOrderByDate = function(date, callback){
    var query = {date: date};
    
    Order.find(query, callback).populate('items');   
}

//Add order
module.exports.addOrder = function(newOrder, callback) {
    
    newOrder.save(callback);
}
