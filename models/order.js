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
//get order by table
module.exports.getOrdersByTable = function(tableId, callback) {
    var date = new Date().setHours(0,0,0,0);
    var query = {table: tableId, date: date, closed: false};
    
    Order.find(query, callback).populate('items');
}

//Add order
module.exports.addOrder = function(newOrder, callback) {
    
    newOrder.save(callback);
}

//Update order
module.exports.closeOrder = function(id, callback) {
    
    
    Order.update({_id: id}, { $set: { closed: true }}, {multi: false}, callback)
    /*
    console.log('about to search................', order);
    Order.findById(id, function (err, order) {
        if (!order) {
            return callback(new Error('could not load meal'));
        } else {
            
            console.log("found:", order);
            //Update
            order.closed = true;  
            order.save(callback);
        }
    });*/
}
