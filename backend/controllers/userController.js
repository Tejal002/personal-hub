
import userService from "../service/userService.js"


const register = async (req, res) => {

    const { name, email, password } = req.body;
    try {
        const token = await userService.registerUser({ name, email, password });

        res.cookie("token", token, {
            httpOnly: true,
            //secure:true --production(http,https)
            sameSite: "lax", //,strict,lax,none
            maxAge: 1000 * 60 * 60 * 24 * 1

        });

        res.json({
            data: {
                message: "User registered successfully!"
            },
            error: null,
        });

    } catch (err) {
        console.log(err.message);
        res.json({
            error: {
                message: "failed to connect with db!",
                info: err.message
            },
            data: null
        });
    }

};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userService.login({ email, password });

        res.cookie("token", user.token, {
            httpOnly: true,
            // secure
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24 * 1
        });

        res.json({
            data: {
                message: "User login successfully!",
                user: user.user
            },
            err: null
        })
    }
    catch (err) {
        res.json({
            data: null,
            error: {
                message: "Falied to login",
                info: err.message
            }
        })
    }
};

const joinCommunity = async (req, res) => {
    const { communityId } = req.query;
    const userId=req.user._id;
   

    try {
        const data=await userService.joinCommunity(userId, communityId);
        res.json({
            data: {
                message: "User joined community successfully!",
                data
            },
            error: null
        })

    } catch (err) {
        res.json({
            error: {
                message: "somethimg went wrong!",
                info: err.message
            },
            data: null
        })

    }
};

const makeHost = async (req, res) => {

    try {
        const userId = req.user._id;
        await userService.makeHost(userId);
        res.json({
            data: {
                message: "User role is upgraded to Host!"
            },
            Error: null
        })

    } catch (err) {
        res.json({
            Error: {
                message: "User role can't be upgraded to Host!",
                info: err.message
            }
        })
    }
}

const profile = (req, res) => {
    try {
        const user = req.user;

        if (!user) {
            throw new Error("User is not logged in!");
        }
        return res.json({
            data: {
                info: "User details fetched successfully!",
                user
            },
            error: null
        });

    } catch (err) {

        return res.json({
            Error: {
                message: "Failed to fetch user details!",
                info: err.message
            },
            data: null
        })
    }


}

const leaveCommunity = async (req, res) => {

    try {
        const {_id:userId}=req.user;
        const {id}=req.params;
       
         await userService.leaveCommunityService(userId,id);
        return res.json({
            data: {
                info: "User left community successfylly!"
            },
            error: null
        });

    } catch (err) {
        return res.json({
            Error: {
            info: "Failed to remove user from community!",
            message: err.message
        },
        data:null
    }
        );
    }
}

const dashboard=async(req,res)=>{
   try{
    const {_id:userId}=req.user;
    const dashboard=await userService.dashboardService(userId);

    return res.json({
        data:{
            message:"Successfully fetched the dashboard details",
            dashboard
        },
        Error:null
    });

   }catch(err){
     return res.json({
        Error:{
            message:"failed to fetch the dashboard details",
            info:err.message
        },
        data:null
    });

   }
}

const hostDashboard=async(req,res)=>{
    try{
        const {_id}=req.user;
        if(!_id) throw new Error("user id is not defined!");

        const hostDashBoard=await userService.hostDashboardService(_id);
        return res.json({
            Error:{
                data:"host dashboard is fetched successfully!",
                hostDashBoard
            },
            data:null
        })
    }
    catch(err){
        return res.json({
            Error:{
                message:"Failed to fetch host dashboard data!",
                info:err.message
            },
            data:null
        })
    }
}

export default {
    register,
    login,
    joinCommunity,
    makeHost,
    profile,
    leaveCommunity,
    dashboard,
    hostDashboard
}