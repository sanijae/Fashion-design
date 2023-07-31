const mongoose = require('mongoose')

const post_schema = mongoose.Schema({
    title:String,
    desc:String,
    category:String,
    wears:String,
    dress:String,
    type:String,
    images:[Object],
    price:String,
    color:String,
    size:String,
    createdAt:{type:Date,default: new Date()},
    createdBy:{type:mongoose.Schema.Types.ObjectId,ref:'vendors'}
})
// tag> labels
module.exports = mongoose.model('posts',post_schema)