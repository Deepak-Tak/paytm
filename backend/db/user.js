const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://deepaktak1444:Y5b3sGzxUb4Pa3Dd@cluster0.d5fwzpg.mongodb.net/PaytmClone');


const userSchema = new mongoose.Schema({FirstName: String, LastName: String , Email: String, Password: String})

const Users = mongoose.model('PaytmCloneUsers', userSchema);

module.exports=Users;