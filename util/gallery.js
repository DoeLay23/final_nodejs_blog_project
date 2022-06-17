const helper = require('./helper');
const fs = require('fs');
let upload = (req)=>{
    req.files.photo.name = `${Date.now()}-${req.files.photo.name}`;
        req.body.path = `./images/${req.files.photo.name}`;
        req.body.image = `192.168.100.147:3000/images/${req.files.photo.name}`;
        req.files.photo.mv(req.body.path);
}
let photoUpload = (req,res,next)=>{
    if(!req.files.photo){
        res.send(helper.formatMsg(0,'empty photo'));
    }else{
        upload(req);
        next();
    }
}


module.exports = {
    upload,
    photoUpload,
    deletePhoto : path => fs.unlinkSync(path)
}