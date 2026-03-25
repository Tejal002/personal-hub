import mongoose from "mongoose"

const connectDB=async(url)=>{
   try{
    await mongoose.connect(url);
    console.log("connected!");
   }
   catch(error){
    console.log(`connetion failed due to ${e.message}`);
   }
}

export default connectDB;