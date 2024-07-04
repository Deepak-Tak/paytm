const express = require("express");
const bodyParser = require("body-parser");
const authenticationRouter = require("./routers/authentication")
const cors = require("cors")

const app =express();
app.use(cors());
app.use(bodyParser.json());
app.use('/authentication',authenticationRouter);




app.listen(3000,()=>console.log("Server is Listening"));




