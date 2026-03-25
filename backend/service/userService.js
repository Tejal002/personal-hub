import User from "../models/User.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Community from "../models/Community.js"
import mongoose from "mongoose";

const registerUser = async ({ name, email, password }) => {

    let inputError = [];
    if (!name) inputError.push("Name is required!");
    if (!email) inputError.push("Email is required");
    if (!password) inputError.push("Password is required!");

    if (password?.length < 6) {
        inputError.push("Password length mush at least 6 characters!");
    }

    if (name.length < 10 || name.length > 100) {
        inputError.push("Name length must be in range [10,100]");
    }

    const existingUser = await User.findOne({ email: email });

    if (existingUser) inputError.push(`User: ${email} is already exists!`);

    if (inputError.length) throw new Error(inputError.join(","));

    //Hashing and password

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        name, email, hashedPassword
    });

    await user.save()
    const token = jwt.sign({ user }, 
        process.env.JWT_SECRET, {
        expiresIn: "1d",
    });

    return token;
}   

const login=async({email,password})=>{

    let inputErr=[];
    if(!email){
        inputErr.push('Email is required!');
    }
    if(!password){
         inputErr.push('Password is required!');
    }

    if (password?.length < 6) {
        inputErr.push("Password length mush at least 6 characters!");
    }

    if(inputErr.length){
        throw new Error(inputErr.join(","));
    }

    //password-compare
    const user=await User.findOne({email}).select("+hashedPassword");

    if(!user){
        throw new Error("User doesn't exist!");
    }

    const validPass=await bcrypt.compare(password,user.hashedPassword);

    if(!validPass){
        throw new Error("Password doesn't match!");
    }
    
    //token genearte
    const token=jwt.sign({user}, process.env.JWT_SECRET, {
        expiresIn: "1d"}
    );

    let res=delete user.hashedPassword;
    console.log("deleted:",res);
    console.log(user)
    return {user,token};

}

const makeHost=async(userId)=>{

   const updatedUser=await  User.findByIdAndUpdate(userId,{role:"host"},{new:true});
   console.log(updatedUser);
}

const joinCommunity=async(userId,communityId)=>{

    let inputError=[];
    if(!communityId) inputError.push("Community Id is required!");


     if(!(mongoose.Types.ObjectId.isValid(communityId))){
            throw new Error("Community id is not valid Object Id");
        }
        
    const existingCommunity=await Community.findById(communityId); 
    if(!existingCommunity) throw new Error("Community does not exist!");

    

      

    await User.findByIdAndUpdate(userId,{
        $addToSet:{
           joinedCommunities:communityId 
        }
    })

}

const leaveCommunityService=async(userId,id)=>{
    console.log(userId,id);
    if(!mongoose.Types.ObjectId.isValid(id)) throw new Error("Community id is not valid mongoose id");
    const community=await Community.findById(id);
    if(!community) throw new Error("Community does not exist in the user community list!");

    await User.findByIdAndUpdate(userId,{
        $pull:{joinedCommunities:id},
    });

    
}

export default {
    registerUser,
    login,
    joinCommunity, 
    makeHost,
    leaveCommunityService
}