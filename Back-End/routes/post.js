const express=require("express");
// const { post } = require(".");
const Post=require("../model/post")
const mongoose=require("mongoose");
const fs = require("fs");
const router=express.Router();
const path = require("path");
const multer = require("multer");
// multer to upload posts and photos

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "../Front-End/my-app/public/uploads");
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + Date.now()+path.extname(file.originalname)
      );
    },
  });
  
  const upload = multer({ storage: storage });
  
router.get("/",async function(req,res){
    try{
        const posts=await Post.find().sort({createdAt:-1});
        return res.json(posts);
    }catch(e){
        res.json({
            status:"failed",
            message:e.message
        });
    }
    

});

router.post("/",upload.single('image'),async function(req,res){
    console.log(req.body,req.file)
    const {title,body,location}=req.body;
	console.log(req.file.path)
	var imagePath = req.file.path.replace("..\\Front-End\\my-app\\public\\uploads\\", "");
    //const image=req.file.fieldname + "-" + Date.now()+path.extname(req.file.originalname)
    const post = await Post.create({
        title,body,location,image: imagePath
    });
    res.json({
        status:"success",
        data:{
            post
        }
    })
});

router.put("/:id",async function(req,res){
    console.log('test',req.params.id)
    const {title,body,location}=req.body;
    console.log("Here->",req.user);
    const post = await Post.findOneAndUpdate({_id:mongoose.Types.ObjectId(req.params.id)},{$set:{title:title,body:body,loaction:location}});
    console.log(post);

    res.json({
        status:"success"
    })
});

router.delete("/:id",async function(req,res){
    await Post.findOneAndDelete({_id:mongoose.Types.ObjectId(req.params.id)})
    res.json({
        status:"success"
    })
});

module.exports=router;