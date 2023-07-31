const mongoose = require('mongoose')
var Schema = mongoose.Schema;

var admin_schema = new Schema({
        name: String,
        email: String,
        password:String,
        avatar:String,
        joinedAt: {type:Date,default: new Date()}
});
// Compile model from schema
var SomeModel = mongoose.model('admins', admin_schema );