const mongoose = require('mongoose')

const vendor_schema = mongoose.Schema({
    email: {type:String,require},
    title: {type:String,require},
    phone: {type:String,require},
    desc: {type:String,require},
    type:{type:String,require},
    logo:String,
    posts:[String],
    address:{type:String,require},
    user: {type:mongoose.Schema.Types.ObjectId,ref:'users'}
}) 
module.exports = mongoose.model('vendors',vendor_schema)