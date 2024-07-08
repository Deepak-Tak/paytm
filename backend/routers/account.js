const {Router} =require('express');
const mongoose =require('mongoose')
const authverification = require('../middlewares/authVerification');
const { Users, Accounts } = require('../db/paytmcloneusers');

const router = Router();

router.get('/balance',authverification ,async (req,res) =>{
    let balance;
    try{
       Users.findOne({Email:res.data})
       .populate('Account')
       .eval()
       .then((user)=>balance=user.Account.Balance)
    }
    catch(e){
        res.status(501).send({msg:'internal error'})
    }

    res.send(200).send({balance : balance});

}
)

router.post('/transfer',authverification,async(res,req)=>{
    const {to,amount} = req.body;
    const {from} = res.data.Account;
    let session
    try{
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