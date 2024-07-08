const express = require("express");
const bodyParser = require("body-parser");
const authenticationrouter = require("./routers/authentication")
const usersinforouter = require("./routers/usersinfo")
const accountrouter = require("./routers/account")
const cors = require("cors")

const app =express();
app.use(cors());
app.use(bodyParser.json());
app.use('/authentication',authenticationrouter);
app.use('/api/v1/users', usersinforouter)
app.use('/api/v1/account',accountrouter)




app.listen(3000,()=>console.log("Server is Listening"));




