const {Router} =require('express');
const mongoose =require('mongoose')
const authverification = require('../middlewares/authVerification');
const { Users, Accounts } = require('../db/paytmcloneusers');

const router = Router();

router.get('/balance',authverification ,async (req,res) =>{
    let balance;
    try{
     const user = await  Users.findOne({Email:res.data})
       .populate('Account')
       .exec()
     balance=user.Account.Balance
    }
    catch(e){
       
       return res.status(501).send({msg:'internal error'})
    }
    console.log(balance)

    res.status(200).send({balance : balance.toString()});

}
)

router.post('/transfer',authverification,async(req,res)=>{
    const to = req.body.to;
    const amount = Number(req.body.amount)
    
    let session
    try{
        const {Account} = await Users.findOne({Email:res.data})
        const from = Account;
        session =await mongoose.startSession();
        session.startTransaction();    
    
        const accountfrom = await Accounts.findById(from).session(session);
        if(!accountfrom||accountfrom.Balance<amount){
             await session.abortTransaction();
             await session.endSession()
             return res.status(400).send({
                msg: "Insufficient balance"
            });
        }
    
        const accountto = await Accounts.findById(to).session(session);
        if(!accountto){
            await session.abortTransaction();
            await session.endSession()
            return res.status(400).send({
               msg: "invalid user"
           });
       }
        //accounts update
        await Accounts.findByIdAndUpdate(from,{$inc:{Balance: -amount}}).session();
        await Accounts.findByIdAndUpdate(to,{$inc:{Balance: amount}}).session();
        
        await session.commitTransaction();
        res.status(200).send({msg:"transaction successful"})
    }
    catch(e){
        await session.abortTransaction();
        res.status(400).send({msg:"transaction failed"})
    }
    finally{
        
        await session.endSession();
    }


})

module.exports = router;