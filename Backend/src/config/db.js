import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const connectDB = async () => {
    const mongo_uri = process.env.MONGO_URI;
    try{
        await mongoose.connect(mongo_uri);
        console.log("DB Connected");
    }catch(err){
        console.error("DB Connection error",err);
        throw err;
    }
}