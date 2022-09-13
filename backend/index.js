const express =require('express');
var mongoose=require('mongoose');
const cors=require('cors');
var connectToMongo=require('./db');
connectToMongo();
var app=express();
app.use(cors());
app.use(express.json());
port=process.env.PORT || 2001;
app.use('/api/auth',require("./routes/auth"))
app.use('/api/notes',require("./routes/notes"))

app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})