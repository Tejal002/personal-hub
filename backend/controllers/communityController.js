import communityService from "../service/communityService.js";

const createCommunity = async (req, res) => {
    try {
        const { name, description, category } = req.body;
        const host = req.user._id;
      
        console.log("host:",host);
       
        await communityService.createCommunityService({ name, description, host, category });
        res.send({
            data: {
                info: "community is created successfully!"
            },
            error: null
        })
    }
    catch (err) {
        res.json({
            error: {
                info: "community cant be created!",
                message: err.message
            },
            data: null
        })
    }

};

const getAllCommunity = async (req, res) => {

    try {
        const communitites = await communityService.getAllCommunityService();

        res.json({
            data: {
                message: "Successfully fetched all communities!",
                communitites
            },
            error: null
        });

    } catch (err) {
        console.log(err);
        return res.json({
            error: {
                message: "Failed to fetch all communities!",
                info: err.message
            },
            data: null
        });
    }
};

const getSpecificCommunity = async (req, res) => {

    const { id } = req.query;

    try {
        const community = await communityService.getSpecificCommunityService(id);

        res.json({
            data: {
                message: "Successfully fetched community details!",
                community
            },
            error: null
        })
    } catch (err) {
        console.log(err);
        res.json({
            error: {
                message: "Failed to fetch communitu details!",
                info: err.message
            },
            data: null
        })

    }
}

const getCommunityWithMember = async (req, res) => {


    try {
        const { id } = req.query;       
        const community = await communityService.getCommunityWithMemberService(id);

        res.json({
            data: {
                info: "Successfully fetched community data!",
                community
            },
            error: null
        })

    } catch (err) {
        return res.json({
            error: {
                message: "Failed to fetched community data with members!",
                info: err.message
            },
            data: null
        })
    }

}

const deleteCommunity=async(req,res)=>{
    try{
        const {id:communityId}=req.params;
        console.log("controller:",communityId);
        const {_id:userId}=req.user;
        await communityService.deleteCommunityService({communityId,userId});

        return res.json({
            data:{
                info:"Community deleted successfully!"
            },
            error:null
        });
        
    }catch(err){
        console.log(err);
        return res.json({
            Error:{
                message:"failed to delete this community!",
                info:err.message
            },
            data:null
        });
    }
}

export default {
    createCommunity,
    getAllCommunity,
    getSpecificCommunity,
    getCommunityWithMember,
    deleteCommunity
}