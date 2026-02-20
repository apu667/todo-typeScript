import mongoose from "mongoose";

export const connectDb=async()=>{
    try {
        await mongoose.connect(process.env.mongodbURI!);
        console.log("DataBase connection successfully")
    } catch (error) {
        console.log("DataBase connection failed")
        console.log(error)
    }
}
