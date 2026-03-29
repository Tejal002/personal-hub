export const isMemberMiddleware=(req,res,next)=>{

    try{
        if(req.user.role!="member") throw new Error("This apis is only accessed by host!");
        next();
    }catch(err){
        console.log(err);
        return res.json({
            Error:{
                err:"unable to fetch user dashboard!",
                message:err.message
            }
        });
    }
}