const express=require("express");
const User = require("../model/user");
const router=express.Router();
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");

router.post("/login",async function(req,res){
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(500).json('oh noes!');
    }
    const match = await bcrypt.compare(password,user.password);
    if(!match){
        return res.status(500).json('oh noes!');
    }
    const token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60 *60),
        data:user._id
    }, 'Instaclone-456');

    res.json({
        status:"success",
        data:{
            token
        }
    });
    }catch(e){
        return res.status(500).json('oh noes!');
    }
    
});

router.post("/register",async function(req,res){
    try{
        const {name,email,password}=req.body;
        const hash=await bcrypt.hash(password,10);
        // console.log(hash);
        await User.create({name,email,password:hash});
        res.json({
            status:"Success",
            message:"SignUp Successfull"
        })
    }
    catch(e){
        res.json({
            status:"Failed",
            message:e.message
        })
    }
    
})

module.exports=router;
