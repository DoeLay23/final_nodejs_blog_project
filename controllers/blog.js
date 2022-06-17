const helper = require('../util/helper');
const gallery = require('../util/gallery');
const Db = require('../models/blog');
const { validateRole } = require('../util/validator');
const help = require('nodemon/lib/help');
const { valid } = require('joi');



let create = async(req,res)=>{
    let writer = helper.verifyToken(helper.getToken(req.headers.authorization));
    req.body.writer = writer._id;
    let result = await Db(req.body).save();
    res.send(helper.formatMsg(1,'Success',result));
}
let update = async(req,res)=>{
   
    if(isBlogWriter(req.headers.authorization,req.params.id)){
        if(req.files){
           let blog = await Db.findById(req.params.id);
           gallery.upload(req) ;
           gallery.deletePhoto(blog.path);
           await Db.findByIdAndUpdate(req.params.id,req.body);
           let result = await Db.findById(req.params.id);
           res.send(helper.formatMsg(1,'update success',result));
        }else{
            await Db.findByIdAndUpdate(req.params.id,req.body);
            let result = await Db.findById(req.params.id);
           res.send(helper.formatMsg(1,'update success',result));
        }
    }else res.send(helper.formatMsg(0,'Authorization Errror'));
}
let remove = async(req,res)=>{
   let blog = await Db.findById(req.params.id);
   let user = helper.verifyToken(helper.getToken(req.headers.authorization));
   if(blog){
   
    if(user.role == 'owner'){
        gallery.deletePhoto(blog.path);
        await Db.findByIdAndDelete(req.params.id);
        res.send(helper.formatMsg(0,'blog is deleted by owner'));
    }else if(user.role == 'admin'){
          if(user._id == blog.writer){
            gallery.deletePhoto(blog.path);
            await Db.findByIdAndDelete(req.params.id);
        res.send(helper.formatMsg(0,'blog is deleted by admin'));
          } else{
            res.send(helper.formatMsg(0,'You are not blog owner'));
          } 
        }else{
            res.send(helper.formatMsg(0,'Authorization Errror'));
          } 
    
   } else{
    res.send(helper.formatMsg(0,'Blog not found'));
   }
   
    
}

module.exports =  {
    create,
    update,
    remove,
    all : async(req,res)=> res.send(helper.formatMsg(1,'All Blogs',await Db.find()))
}