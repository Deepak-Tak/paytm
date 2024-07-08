const {Router} = require("express");
const authverification = require("../middlewares/authVerification");
const {Users} = require("../db/paytmcloneusers");

const router = Router();


router.get('/bulk',authverification,async(req,res)=>{
     try{
          let list = await Users.find({$or : 
               [{FirstName:new RegExp(req.query.filter,'i')},{LastName: new RegExp(req.query.filter,'i')}]}).select("-Password_hash");
          res.status(200).json(list);
     }
     catch(e){
          res.status(500).send({msg:'try again'})
          }
     

})


module.exports=router