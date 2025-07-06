import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

export const connectDB = async () => {
    try{
        const session = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        console.log(`Database Connected Successfully : ${session.connection.host}`);
        return session;
    }
    catch(error){
        console.error(`Error Connecting to the Database : ${error.message}`);
        process.exit(1);
    }

}
