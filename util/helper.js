const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let formatMsg = (con,msg,result)=>{
    if(con ==1)con = true;
    if(con == 0)con = false;
    return {
        con :con,
        msg :msg,
        result :result
    };
}

module.exports = {
    formatMsg,
    encodePw : pw => bcrypt.hashSync(pw,10),
    comparePw : (plain,hash)=> bcrypt.compareSync(plain,hash),
    makeToken : data=> jwt.sign(data,process.env.SECRET_KEY),
    verifyToken : token => jwt.verify(token,process.env.SECRET_KEY),
    getToken : berarToken => berarToken.split(' ')[1]
}