import mongoose from "mongoose";

const eventSchema=new mongoose.Schema({
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
    communityId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Community",
    },
    host:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    city:{
        type:String,
        trim:true,
        required:true
    },
    venue:{
        type:String,
        trim:true,
        required:true
    },
    time:{
        type:Date,
        required:true
    },
    capacity:{
        type:Number,
    }
});

const Event=mongoose.model("event",eventSchema);
export default Event;