const bodyParser = require("body-parser");
const cors = require('cors');
const express=require("express");
const mongoose=require("mongoose");
const app=express();
const indexRoutes=require("./routes/index");
const postRoutes=require("./routes/post");
const jwt=require("jsonwebtoken");
const multer = require("multer")
const fs = require("fs")
// const url='mongodb+srv://sravyalavu:Network123@@cluster0.wsj4x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect("mongodb://localhost:27017/sravya");
// app.get("/",function(req,res){
//     res.json({
//         status:"success"
//     })
// })

app.use(cors());
app.use("/posts",function(req,res,next){
    try{
        const token=req.headers.authorization?.split(" ")[1];
        console.log(token);
        if(!token){
            return res.status(401).json({
                status:"failed",
                message:"Not Authenticated"
            });
        }
        const decoded = jwt.verify(token,'Instaclone-456');
        console.log(decoded);
        if(!decoded){
            return res.status(401).json({
                status:"failed",
            message: "Invalid token"
            })
        }
        req.user=decoded.data;
    }catch(e){
        return res.status(500).json({
            status:"failed",
            message:e.message
        })
    }
    
    
    next();
});

app.use(bodyParser());
app.use("/",indexRoutes);
app.use("/posts",postRoutes);

app.listen("8000",()=>console.log("server listening on port 8000"));