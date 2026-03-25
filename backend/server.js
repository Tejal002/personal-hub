import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import communityRoutes from "./routes/communityRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app=express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/api/user",userRoutes);
app.use("/api/event",eventRoutes);
app.use("/api/community",communityRoutes);



const PORT=process.env.PORT||4000;
const MONGO_URI=process.env.MONGO_URI||"mongodb://localhost:27017/community";
connectDB(MONGO_URI);


app.listen(PORT,()=>{
    console.log("server is listening!",PORT);
})