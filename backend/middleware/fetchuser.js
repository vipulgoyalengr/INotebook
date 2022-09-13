var jwt = require('jsonwebtoken');
const JWT_SECRET="Thisismyapp";


const fetchuser=(req,res,next)=>{
var token =req.header('auth-token');

if(!token){
    return res.status(400).json({ errors: "Invalid token" });
}
try{
    console.log("approved")
var data=jwt.verify(token,JWT_SECRET);
req.user=data;

next();
}
catch(err){
    return res.status(400).json({ errors: "Invalid token" });

}
}
module.exports=fetchuser;