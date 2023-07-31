const mongoose = require('mongoose')

const order_schema = mongoose.Schema({
    quantity:String,
    deliveryRoute:String,
    user:{type:mongoose.Schema.Types.ObjectId,ref:'users'},
    post:{type:mongoose.Schema.Types.ObjectId,ref:'posts'},
    orderedAt:{type:Date,default: new Date()},
})

module.exports = mongoose.model('orders',order_schema)