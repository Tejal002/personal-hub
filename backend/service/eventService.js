import mongoose from "mongoose";
import Event from "../models/Event.js";

const createEventService=async({name,description,communityId,city,venue,time,host})=>{

    let inputError=[];
    if(!name) inputError.push("Event name is required!");
    if(!description) inputError.push("Event description is required!");
    if(!communityId) inputError.push("City is required!");
    if(!venue) inputError.push("Event venue is required!");
    if(!city) inputError.push("city is required!");
    if(!time) inputError.push("Event time is required!");

    if(!(mongoose.Types.ObjectId.isValid(communityId))){
        throw new Error("Community Id is not valid!");
    }

    if(inputError.length){
        throw new Error(inputError.join(","));
    }

    const event=new Event({name,description,communityId,city,venue,time});
    event.host=host;
    const newEvent=await event.save();
    console.log(newEvent);
}

const getAllEvents=async({city,keyword})=>{
    const filter={time:{$gte:Date.now()}};

    if(city) filter.city={
        $regex:city,$options:"i"
    };
    if(keyword) filter.$or=[
        {
            name:
            {
                $regex:keyword,
                 $options:"i"
                }},
        {
            description:
            {$regex:keyword, 
                $options:"i"}},
    ]

    return await Event.find(filter);
}

const getSpecificEventService=async(id)=>{
    if(!id)throw new Error("Given id is not valid mongoose id");
    const event=await Event.findById(id).populate({
        path:"communityId",
        select:"name host -_id",
        populate:{
            path:"host",
            select:"name -_id"
        }
    });

    if(!event)throw new Error("No event is found with given id!")

    return event
}


export default{
    createEventService,
    getAllEvents,
    getSpecificEventService
}