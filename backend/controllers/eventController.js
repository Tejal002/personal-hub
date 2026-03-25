import eventCommunity from "../service/eventService.js";

const createEvent=async(req,res)=>{
    try{
          const {name,description,communityId,city,venue,time}=req.body;
          let host=req.user._id;
          await eventCommunity.createEventService({name,description,communityId,city,venue,time,host});
          res.json({
            data:{
                message:"Event is created successfully!"
            },
            error:null
          })
    }catch(err){
        res.json({
            error:{
                message:"Event cant be created!",
                info:err.message
            },
            data:null
        })
    }
  
    
};

const getAllEvents=async(req,res)=>{
    try{
        const {city,keyword}=req.query;
        const events=await eventCommunity.getAllEvents({city,keyword});

        return res.json({
            data:{
                info:"Events fetched successfully!",
                events
            },
            error:null
        });
    }catch(err){
         return res.json({
            Error:{
                info:" Failed to fetch Events!",
                message:err.message
            },
            data:null
        });
    }
};

export default {
    createEvent,
    getAllEvents
}