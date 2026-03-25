import mongoose from "mongoose";
import Community from "../models/Community.js";
import User from "../models/User.js";

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
    const communities=await Community.find({}).populate({
        path:"host",
        select:"name -_id",
    }).lean(); //lean() will convert mongoose object into plain object
    return communities;
}

const getSpecificCommunityService=async(id)=>{
    if(!mongoose.Types.ObjectId.isValid(id)) throw new Error("community id is not valid!");
    const community=await Community.findById(id).populate(
        {
            path:"host",
            select:"name -_id"
        }
    ).lean();
    if(!community) throw new Error("Community does not exist!");
    return community;
}

const getCommunityWithMemberService=async(id)=>{
    if(!mongoose.Types.ObjectId.isValid(id)) throw new Error("Id is not valid!");
    const community=await Community.findById(id).populate({
        path:"host",
        select:"name -_id"
    }).lean();

    if(!community) throw new Error("community does not exist!");

    const members=await User.find({
        joinedCommunities:id
    }).lean();

    community.members=members;

    return community;



}

export default{
    createCommunityService,
    getAllCommunityService,
    getSpecificCommunityService,
    getCommunityWithMemberService
}