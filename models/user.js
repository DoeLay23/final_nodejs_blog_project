const mongoose = require('mongoose');
const Role = ['user','admin','owner'];
const {Schema} = mongoose;
const UserModel = new Schema({
    name : {type:String,required:true},
    phone : {type:String,required:true},
    email : {type:String,required:true},
    password : {type:String,required:true},
    role : {type:String,enum : Role,required:true},
    created : {type:Date,default:Date.now()},
})
const User = mongoose.model('user',UserModel);
module.exports = User;