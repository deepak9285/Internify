import mongoose from "mongoose";

export const connectDB = async ()=> {
  
    try {
        const db = await mongoose.connect(process.env.MONGO_URI || "")


        console.log("Database connected")

    } catch (error) {
        console.log("Server Error")
        process.exit()
    }
}