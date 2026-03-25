export const isHostMiddleware = (req, res, next) => {

    try {
        
        if (!(req.user.role === "host")) {
           
            throw new Error("logged in user must be host!");
           
        }
        //  req.host=req.user;
       
         next();
    }
    catch (err) {
        console.log(err)
        return res.json({
            error: {
                message:"Failed to access Host apis",
                info: err.message
            }
        });
    }
}