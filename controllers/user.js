const helper = require('../util/helper');
const Db = require('../models/user');

let exitUser = async userData => await Db.findOne(userData);

let register = rolename => {
    return async(req,res)=>{
        let phone = await exitUser({phone :req.body.phone});
        if(!phone){
            let email = await exitUser({email :req.body.email});
            if(!email){
                req.body.password = helper.encodePw(req.body.password);
                req.body.role = rolename;
                await new Db(req.body).save();
                res.send(helper.formatMsg(1,'register success'));
            }else res.send(helper.formatMsg(0,'Email is already in use'));
        }else res.send(helper.formatMsg(0,'phone is already in use'));
    }
}

let login  = async(req,res)=>{
    let emailUser = await exitUser({email:req.body.email});
    if(!emailUser)res.send(helper.formatMsg(0,'user not found'));
    else{
        let checkPw = helper.comparePw(req.body.password,emailUser.password);
        if(checkPw){
            let result = await emailUser.toObject();
            delete result.password;
            result.token = helper.makeToken(result);
            res.send(helper.formatMsg(1,'Login success',result));
        }else{
            res.send(helper.formatMsg(0,'Login Fail'));
        }
    }
}
  
module.exports = {
    register,
    login
}