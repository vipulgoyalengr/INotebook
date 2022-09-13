var express= require('express');
const fetchuser = require('../middleware/fetchuser');
const router=express.Router();
const Notes=require('../models/notes');
const { body, validationResult } = require('express-validator');

router.get('/fetchallnotes',fetchuser,async (req,res)=>{
    var data=await Notes.find({user:req.user});

    res.send(data)
})
router.post('/addnotes',fetchuser,[
    body('title').isLength({min:5}),
    body('description').isLength({min:8})
],async (req,res)=>{
    try{
        const {title,description,tag}=req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        var note=new Notes({
            user:req.user,title,description,tag
            })
            var saveddata=await note.save();
            res.send(saveddata)
    }
    catch(err){
        console.log(err)
        res.json({err:err});
    }

})
router.put('/updatenotes/:id',fetchuser,async (req,res)=>{
    const {title,description,tag}=req.body;
    const newNote={};
    if(title){newNote.title=title}
    if(description){newNote.description=description}
    if(tag){newNote.tag=tag}
    let note=await Notes.findById(req.params.id);
    if(!note){
        return res.status(400).send("Not Found");
    }
    if(note.user.toString()!==req.user){
        return res.status(400).send("Not allowed");
    }
    note =await Notes.findByIdAndUpdate(req.params.id,{$set: newNote},{new:true})
    res.json({note})


})
router.delete('/deletenotes/:id',fetchuser,async (req,res)=>{
    const {title,description,tag}=req.body;
    const newNote={};
    if(title){newNote.title=title}
    if(description){newNote.description=description}
    if(tag){newNote.tag=tag}
    let note=await Notes.findById(req.params.id);
    if(!note){
        return res.status(400).send("Not Found");
    }
    if(note.user.toString()!==req.user){
        return res.status(400).send("Not allowed");
    }
    note =await Notes.findByIdAndDelete(req.params.id);

    res.json({"Success":"Done"})

})
module.exports=router;