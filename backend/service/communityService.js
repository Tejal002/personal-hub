import mongoose from "mongoose";
import Community from "../models/Community.js";

const createCommunityService=async({name, description, host, category})=>{
    const inputErr=[];
    if(!name) inputErr.push("community name is required!");
    if(!description) inputErr.push("description name is required!");
    if(!host) inputErr.push("host name is required!");
    if(!category) inputErr.push("category name is required!");

    if(inputErr.length){
        throw new Error(inputErr.join(","));
    }
    if(!(mongoose.Types.ObjectId.isValid(host))){
        throw new Error("Host id is not valid Object")
    }

    const community=new Community({name,description,host,category});
    await community.save();

}
 
const getAllCommunityService=async()=>{
    const communities=await Community.find({}).lean(); //lean() will convert mongoose object into plain object
    return communities;
}

export default{
    createCommunityService,
    getAllCommunityService
}