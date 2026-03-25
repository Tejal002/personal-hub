
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

const joinCommunity=async(req,res)=>{
    const {communityId}=req.query;
    console.log(communityId);

    try{
        await userService.joinCommunity(req.user.id,communityId);
        res.json({
            data:{
                message:"User joined community successfully!"
            },
            error:null
        })

    }catch(err){
        res.json({
            error:{
                message:"somethimg went wrong!",
                info:err.message
            },
            data:null
        })

    }
};

const makeHost=async(req,res)=>{

    try{
        const userId=req.user._id;
        await userService.makeHost(userId);
        res.json({
            data:{
                message:"User role is upgraded to Host!"
            },
            Error:null
        })

    }catch(err){
        res.json({
            Error:{
                message:"User role can't be upgraded to Host!",
                info:err.message
            }
        })
    }
}

export default {
    register,
    login,
    joinCommunity,
    makeHost
}