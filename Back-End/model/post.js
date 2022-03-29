const mongoose=require("mongoose");

const PostSchema=mongoose.Schema({
    title:{type:String,required:true},
    body:{type:String,required:true},
    location:{type:String,required:true},
    image:{type:String,required:true},
    user:{type:mongoose.Types.ObjectId,ref:"User"}
},{ timestamps: true });

const Post=mongoose.model("Post",PostSchema);

module.exports=Post;