const mongoose = require('mongoose')

const user_schema = mongoose.Schema({
    name: {type:String,require:true},
    email: {type:String,require:true},
    password:{type:String,require:true},
    avatar:String,
    posts: [String],
    vendor:{type:mongoose.Schema.Types.ObjectId,ref:'vendors'} ,
    order:{type:mongoose.Schema.Types.ObjectId,ref:'orders'} ,
    joinedAt: {type:Date,default: new Date()}

})

module.exports = mongoose.model('users',user_schema)