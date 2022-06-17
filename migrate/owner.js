const Db  = require('../models/user');
const  helper = require('../util/helper');
let owner = async()=>{
    let user = {
        name : 'Htet',
        phone : '091234567',
        email : 'htet@gmail.com',
        password:'123456',
        role : 'owner'
    }
    user.password = helper.encodePw(user.password);
    let saveUser = await new Db(user).save();
    console.log(saveUser);
}

module.exports ={
    owner
}