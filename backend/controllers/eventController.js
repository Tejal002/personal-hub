import eventCommunity from "../service/eventCommunity.js";

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

const getEvent=()=>{

};

export default {
    createEvent,
    getEvent
}