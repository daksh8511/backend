import mongoose from "mongoose";

const ConnecetDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://daxsathwara102_db_user:daxsathwara102_db_users@practicecluster.ah8rybu.mongodb.net/user')
        console.log("Successfully connected")
    } catch (error) {
        console.log('Failed to connect database')
    }
}

export default ConnecetDB;