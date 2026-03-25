import mongoose from "mongoose";
import User from "./User.js";

const communitySchema=new mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true,
        maxLength:500
    },
    host:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    category:{
        type:String,
        enum:["chess","sports","jobs","tech","sports","politics"],
        required:true
    }
});

const Community=mongoose.model("Community",communitySchema);
export default Community;
