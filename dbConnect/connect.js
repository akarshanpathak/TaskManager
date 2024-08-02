import mongoose from "mongoose"

export const connectDb=async()=>{
   try {
    const connection=await mongoose.connect(process.env.MONGODB_URI)
    console.log("mongodb connection successfull");
   } catch (error) {
    console.log("mongodb connection error");
   }
}