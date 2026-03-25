import communityService from "../service/communityService.js";

const createCommunity = async (req, res) => {
    try {
        const { name, description, category } = req.body;
        const { host } = req.user._id;
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
        const communitites = await communityService.getAllCommunityService

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

export default {
    createCommunity,
    getAllCommunity
}