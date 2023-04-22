const express = require("express");
const app=express();
const mongoose = require('mongoose')
const urlRouter = require("./router")
datb = "mongodb+srv://rohit:Rrohit@cluster0.iz0xyeb.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(datb,{
    useNewURLParser: true
}).then(console.log("connected to server"))
.catch((err) => console.log(err));
app.use(express.json())
app.use('/',urlRouter)
app.listen(5001, () => {
    console.log("listening tp 5001")
}) 