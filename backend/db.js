const mongoose = require('mongoose');
const mongoUrl="mongodb+srv://vipul81goyal:nvmpff9$@cluster0.kbrgkfr.mongodb.net/?retryWrites=true&w=majority"
const connectToMongo=()=>{
    mongoose.connect(mongoUrl)
    .then(()=>{
    console.log("Connected to Databases ")
    }).catch((err)=>{
        console.log("connection failed",err)
    });
}
module.exports=connectToMongo;
