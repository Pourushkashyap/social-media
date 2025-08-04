import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectdb = async () => {
    console.log(DB_NAME); 
    console.log(process.env.MONGODB_URI); 

    try {
        const connectiondatabase = await mongoose.connect(`${process.env.MONGODB_URI}${DB_NAME}`);
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Connection error: ", error);
    }
};

export default connectdb;