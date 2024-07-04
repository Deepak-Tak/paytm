const argon2 = require('argon2');
const Users = require('../db/paytmcloneusers')
const userverify = async(req,res,next) => {
    const Email = req.body.Email;
    const user =await Users.findOne({Email});
   
    if(!user)
    return res.status(400).send({msg:'email not registered'})
    
    const validate = await argon2.verify(user.Password_hash,req.body.Password)
    if(!validate)
    return res.status(400).send({msg:'invalid password'})
    

    
    
    res.data = {user:user};
    next();
  
}

module.exports=userverify;