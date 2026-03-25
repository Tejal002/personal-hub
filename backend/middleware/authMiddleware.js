import User from "../models/User.js"
import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {

    try {
        const token = req.cookies.token;
        if (!token) {
            throw new Error("token is not found!");
        }

        const data = jwt.verify(token, process.env.JWT_SECRET);
        const email = data.user.email;
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error("Invalid payload");
        }

        req.user = user;
        next();
    }
    catch (err) {
        return res.send({
            error: {
                info: "Something is wrong!",
                err: err.message
            },
            data: null
        })
    }
}