const Users = require("../db/paytmcloneusers")
const {argon2} = require("../db/paytmcloneusers")
const userverify = require('../middlewares/userverify')
const {Router} = require("express")
const zod = require('zod')
const router = Router();



function zodvalidation (req,res,next) {
  const Schema = zod.object({FirstName:zod.string(),LastName:zod.string(),Password:zod.string().min(8),Email:zod.string().email()})
   const FirstName = req.body.FirstName;
   const LastName = req.body.LastName;
   const Email = req.body.Email;
   const valid = Schema.safeParse({FirstName,LastName,Email,Password:req.body.Password})

   if(!valid.success){
     return res.status(400).send(valid.error);
   }
   next();
}
router.post("/signup",zodvalidation, async (req,res)=>{
   
    const FirstName = req.body.FirstName;
    const LastName = req.body.LastName;
    const Email = req.body.Email;


    
    
    //user existance check
    const userexists = await Users.findOne({Email:Email});
    if(userexists)
    return res.status(400).send('user with this Email already exists')

    const newUser = new Users({FirstName: FirstName,LastName: LastName,Email:Email})
    newUser.Password_hash = await newUser.createHash(req.body.Password);
    
    
    await newUser.save();
    res.status(200).send({msg: 'signup success'});
})


router.post("/signin",userverify,async (req,res) => {
  res.json("ohk")
})
router.post("/update/password",userverify,async(req,res)=>{
       
       //zod validate
       const Schema = zod.object({Password:zod.string().min(8)})
       const zodvalidate = Schema.safeParse({Password:req.body.newPassword})
       if(!zodvalidate.success)
       return res.status(400).send(zodvalidate.error)

       //udpate
       
       const user = res.data.user
       const updatedHash =await user.createHash(req.body.newPassword)
       await Users.findByIdAndUpdate(user._id,{Password_hash:updatedHash})
       return res.status(200).send({msg: 'update success'})
})

module.exports = router;
