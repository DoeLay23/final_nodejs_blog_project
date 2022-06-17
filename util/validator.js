const helper = require('./helper');

let validateToken = (req,res,next)=>{
    if(!req.headers.authorization) res.send(helper.formatMsg(0,'Token authorization error'));
    else{
        let token = helper.getToken(req.headers.authorization);
         try{
            helper.verifyToken(token);
            next();
        }catch(e){
            res.send(helper.formatMsg(0,e.message)) ;
        }
        
    }
}
let validateRole = rolename => {
    return(req,res,next)=>{
        let user = helper.verifyToken(helper.getToken(req.headers.authorization));
        console.log(user);
        if(user.role == rolename)next();
        else res.send(helper.formatMsg(0,'Role validation error'));
    }
    
}
module.exports = {
    validateToken,
    validateRole
}