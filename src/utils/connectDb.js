import mongoose from "mongoose";

export const connectDB = async ()=> {
  
    try {
        const db = await mongoose.connect("mongodb+srv://mongodb+srv://vaibhavgupta8245:pogmLNOZUuhiuNPf@cluster0.kk7pg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" || "")


        console.log("Database connected")

    } catch (error) {
        console.log("Server Error")
        process.exit()
    }
}