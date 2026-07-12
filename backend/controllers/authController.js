import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils/generateToken.js";


export const signup = async ( req, res ) => {
    try{
        const { fullname, username, password, email } = req.body;
        const emailRegex = /^\S+@\S+\.\S+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json( { error: "Invalid email" } );
        };
        const existingUser = await User.findOne( {username} );
        if( existingUser ){
            return res.status(400).json( { error: "Username already exists" } );
        };
        const existingEmail = await User.findOne( {email} );
        if( existingEmail ){
            return res.status(400).json( { error: "Email already exists" } );
        };
        if( password.length < 6 ){
            return res.status( 400 ).json( { error: "Password must be at least 6 characters long" } );
        };
        const salt = await bcrypt.genSalt( 10 );
        const hashedPassword = await bcrypt.hash( password, salt );

        const user = new User( {
            fullname, username, password: hashedPassword, email
        } );

        if( user ){
            await user.save();
            generateToken( user._id, res );
            res.status( 201 ).json( {
                _id: user._id,
                username: user.username,
                email: user.email,
                followers: user.followers,
                following: user.following,
                profileImg: user.profileImg,
                coverImg: user.coverImg,
            } );
        }
        else{
            res.status( 400 ).json( {error: "Invalid user data"} );
        }

    }
    catch(err){
        res.status( 500 ).json( { error: err.message } );
    }
}


export const login = async ( req,res ) => {    
    try{
        const { username, password } = req.body;
        const user = await User.findOne( { username } );
        if( !user ){
            return res.status( 404 ).json( { message: "Username not found" } );
        };
        const isPasswordCorrect = await bcrypt.compare( password, user?.password || "" );
        if( !isPasswordCorrect ){
            return res.status( 400 ).json( { message: "Incorrect Password" } );
        }
        generateToken( user._id, res );
        res.status( 200 ).json( { 
                _id: user._id,
                username: user.username,
                email: user.email,
                followers: user.followers,
                following: user.following,
                profileImg: user.profileImg,
                coverImg: user.coverImg,
         } ) 
    }
    catch(error){
        console.log("Error in the login controller ", error.message);
        res.status( 500 ).json( { error: "Internal server error" } );
    }
}
export const logout = async ( req, res ) => {
    res.json( {data: "You hit the logout endpoint"} );
}