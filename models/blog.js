const mongoose = require('mongoose');
const {Schema} = mongoose;
const BlogModel = new Schema({
    writer:{type:Schema.Types.ObjectId,required:true},
    title :{type:String,required:true},
    body :{type:String,required:true},
    path : {type :String,required:true},
    image :{type:String,required:true},
    reacts :{type:Number},
    created :{type:Date,default:Date.now()},
})
const Blog = mongoose.model('blog',BlogModel);
module.exports = Blog ;