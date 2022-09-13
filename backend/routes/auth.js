var express= require('express');
const router=express.Router();
const User=require('../models/auth');
var jwt = require('jsonwebtoken');

var bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const JWT_SECRET="Thisismyapp";
var fetchuser=require('../middleware/fetchuser')
// Create a new user
router.post('/createuser',
body('name').isLength({min:4}),
body('password').isLength({min:8}),
body('email').isEmail(),
async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let user=await User.findOne({email:req.body.email})
    if(user){
        return res.status(400).json({ errors: "User already exists" });
    }
    var salt =await bcrypt.genSaltSync(10);
var hash =await bcrypt.hashSync(req.body.password, salt)
    user=await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash,
      }).then(user => {
        var authtoken = jwt.sign(user.id, JWT_SECRET);
        console.log(authtoken);
        res.json({authtoken:authtoken})
      }
        
        )
      .catch(err=>{console.log(err)
    res.json({err:err})});
    // console.log(req.body)

    // const user=User(req.body);
    // user.save();
    // res.send(req.body)
});

router.post('/login',
body('password').isLength({min:8}),
body('email').isEmail()
,async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email,password}=req.body
    try{
        let user=await User.findOne({email})
        if(!user){
            return res.status(400).json({ errors: "User not found" });
        }
        const passwordcompare=await bcrypt.compare(password,user.password)
        if(!passwordcompare){
            return res.status(400).json({ errors: "Password don't match" });
    
        }
        var authtoken =  jwt.sign(user.id, JWT_SECRET);
        res.json({authtoken:authtoken})
    }
    catch (err){
        console.log(err)
        res.json({err:err});
    }


})

router.post('/getusers',fetchuser,async (req,res)=>{
    try{
        userId=req.user;
        let user=await User.findById(userId).select("-password")
        // console.log(userId)
        res.send(user);

    }
    catch(err){
        console.log(err)
        res.json({err:err});
    }
})
module.exports=router