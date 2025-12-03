import mongoose from "mongoose";

const ConnecetDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Successfully connected")
    } catch (error) {
        console.log('Failed to connect database')
    }
}

export default ConnecetDB;