const {Users, Accounts} = require("../db/paytmcloneusers")
const {argon2} = require("../db/paytmcloneusers")
const userverify = require('../middlewares/userverify')
const authVerification = require("../middlewares/authVerification")
const {Router} = require("express")
const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require("../config")
const zod = require('zod')
const { default: mongoose } = require("mongoose")


const router = Router();



function zodvalidation (req,res,next) {
  const Schema = zod
  .object({
    FirstName: zod.string({
      required_error: "Firstname is required",
      invalid_type_error: "firstname must be a string",
    }),
    LastName: zod.string({
      required_error: "Lastname is required",
      invalid_type_error: "lastname must be a string",
    }),
    Email: zod
      .string({ required_error: "Email is required" })
      .email({ message: "Invalid email address" }),
    Password: zod.string({required_error:"Password is required"}).min(8)
  })
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
    const InitialBalance =Number(req.body.InitialBalance);


    
    
    //user existance check
    let userexists
    try{
       userexists = await Users.findOne({Email:Email});
    }
    catch(e){
      res.status(400).send({msg:'internal error'})
    }
    
    if(userexists)
    return res.status(400).send({msg:'user with this email already exists'})
    
    let session 
    try{      

      session = await mongoose.startSession()
      session.startTransaction()
      
      const newUser = new Users({FirstName: FirstName,LastName: LastName,Email:Email})
      newUser.Password_hash = await argon2.hash(req.body.Password);
      const newAccount =new Accounts({UserId:newUser._id,Balance:InitialBalance})
      newUser.Account = newAccount._id
      

        
        await newAccount.save({session})
        await newUser.save({session})
        await session.commitTransaction()

        res.status(200).send({msg: 'signup success'});
    }
    catch(e){
        await session?.abortTransaction();
        console.log(e)
        res.status(500).send({msg:'try again'})
    }
    finally{
      await session.endSession()
    }
    

})


router.post("/signin",userverify,async (req,res) => {
  const {Email,FirstName,LastName}=res.data.user
  const token = jwt.sign({Email},JWT_SECRET,{ expiresIn: '24h' })

  
  res.status(200).send({token})
})
router.post("/update/password",authVerification,userverify,async(req,res)=>{
       
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
