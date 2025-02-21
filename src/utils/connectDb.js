import mongoose from "mongoose"

export async function connectDb() {
    try {
        mongoose.connect(process.env.MONGO_URI)
        const connection = mongoose.connection

        connection.on("connected", ()=>{
            console.log("Connected to MongoDB")
        })

        connection.on("error", (error) => {
            console.log("Error connecting to MongoDB")
            console.log(error)
            process.exit(1)
        })
        
    } catch (error) {
        console.log("Something went wrong while connecting to database")
        console.log(error)
    }
}