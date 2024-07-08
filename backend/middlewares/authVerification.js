const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../config")

const authverification = (req,res,next) => {
           let token = req.headers.authorization
           if(!token || !token.startsWith('Bearer '))
           res.status(403).send({msg: 'invalid token'})
           token=token.slice(7)

          let decoded 
      try{
        
         decoded = jwt.verify(token, JWT_SECRET)
      }
      catch(e){
          return  res.status(403).send({msg : "invalid token or session expired"})
      }
        res.data = decoded.Email;
      next();
      
      
}

module.exports = authverification;