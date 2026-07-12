import express, { urlencoded } from "express";
import authRoutes from "./routes/authRoutes.js";
import dotenv from "dotenv";
import connectMongoDB from "./db/connectMongoDB.js";

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();
app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) );

app.use( "/api/auth", authRoutes );

await connectMongoDB();
app.listen( PORT, ()=>{
    console.log( `Server is running on PORT: ${PORT}` );
} );
