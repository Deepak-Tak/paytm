const Users = require("./db/user")
const express = require("express");
const zod = require('zod')
const bodyParser = require("body-parser");
const app =express();


app.use(bodyParser.json());
app.post("/signup",async (req,res)=>{
          const FirstName = req.body.FirstName;
          const LastName = req.body.LastName;
          const Email = req.body.Email;
          const Schema = zod.object({FirstName:zod.string(),LastName:zod.string(),Password:zod.string().min(8),Email:zod.string().email()})
          const valid = Schema.safeParse({FirstName,LastName,Email,Password:req.body.Password})

          if(!valid.success){
            return res.status(400).send(valid.error);
          }

          const userexists = await Users.findOne({Email:Email});
          if(userexists)
          return res.status(400).send('user with this Email already exists')
          
          const user = new Users({FirstName: FirstName,LastName: LastName,Email:Email,Password:req.body.Password})
          await user.save();
          res.status(200).send({msg: 'signup success'});
})



app.listen(3000,()=>console.log("Server is Listening"));




