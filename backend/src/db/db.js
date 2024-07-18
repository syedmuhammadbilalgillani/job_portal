// db.js
import mongoose from 'mongoose';
import dotenv from "dotenv";



dotenv.config();
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}`
        );
        console.log(
            `${process.env.DB_NAME} connected !! DB HOST: ${connectionInstance.connection.host}`
        );
    } catch (error) {
        console.log(`${process.env.DB_NAME} connection error`, error);
        process.exit(1);
    }
};

export default connectDB;
