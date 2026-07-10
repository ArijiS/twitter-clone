import mongoose from "mongoose";

const connectMongoDB = async () => {
    try{
        const conn = await mongoose.connect( process.env.MONGO_URI );
        console.log( `Connected to MongoDB at: ${conn.connection.host}` );
    }
    catch( err ){
        console.error( `Error connecting to Mongo: ${err.message}` );
    }
}

export default connectMongoDB;