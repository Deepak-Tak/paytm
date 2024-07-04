const mongoose = require('mongoose');
const argon2 = require('argon2')
mongoose.connect('mongodb+srv://deepaktak1444:Y5b3sGzxUb4Pa3Dd@cluster0.d5fwzpg.mongodb.net/PaytmClone');


const userSchema = new mongoose.Schema({FirstName: String, LastName: String , Email: String, Password_hash: String})
userSchema.methods.createHash = async(plaintextpassword) =>{
                            
   return await argon2.hash(plaintextpassword);
}
const Users = mongoose.model('PaytmCloneUsers', userSchema);
module.exports=Users;