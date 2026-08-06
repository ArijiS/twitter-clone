import User from "../models/userModel.js";
import Notification from "../models/notificationModel.js";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";

export const getUserProfile = async ( req, res ) => {
    const { username } = req.params;
    
    try{
        const user = await User.findOne( { username } ).select( "-password" );
        if( !user ){
            return res.status( 404 ).json( { error: "User not found" } );
        };
        res.status( 200 ).json( { user } );
    }
    catch( error ){
        console.log( "Error in the getUserProfile controller: ", error.message );
        res.status( 500 ).json( { error: "Internal server error" } );
    };
};

export const followUnfollowUser = async ( req, res ) => {
    try{
        if( req.params.id == req.user._id ){
            console.log( "Can't follow/unfollow yourself" );
            return res.status( 400 ).json( { error: "Can't follow/unfollow yourself" } );
        };

        const otherUser = await User.findById( req.params.id ).select( "-password" );
        const currentUser = await User.findById( req.user._id ).select( "-password" );

        if( !otherUser || !currentUser ){
            console.log( "No user to follow/unfollow found." );
            return res.status( 404 ).json( { error: "No user to follow/unfollow found."  } );
        }

        const isFollowing = currentUser.following.includes( req.params.id );

        if( isFollowing ){
            //UNFOLLOW
            await User.findByIdAndUpdate( req.params.id, { $pull: { followers: req.user._id } } );
            await User.findByIdAndUpdate( req.user._id, { $pull: { following: req.params.id } } );
            
            res.status( 200 ).json( { message: "User unfollowed" } );
        }
        else{
            //FOLLOW
            await User.findByIdAndUpdate( req.params.id, { $push: { followers: req.user._id } } );
            await User.findByIdAndUpdate( req.user._id, { $push: { following: req.params.id } } );
            //send notification 👇🏾
            const newNotification = new Notification( {
                type: "follow",
                to: otherUser._id,
                from: currentUser._id,
                
            } );
            await newNotification.save();
            
            res.status( 200 ).json( { message: "User followed successfully" } );
        }
    }
    catch( error ){
        console.log( "Error in the followUnfollowUser controller: ", error.message );
        res.status( 500 ).json( { error: error.message } );
    };
};

export const getSuggestedUsers = async ( req, res ) => {

    try{
        const userId = req.user._id;
        const users = await User.aggregate( [
        { $match: { _id: { $ne: userId }} },
        { $sample: { size: 10 } },
        { $project: { password: 0 } },
        ] );
        const filteredUsers = users.filter( user => !req.user.following.includes( user._id ) );
        const suggestedUsers = filteredUsers.slice( 0, 4 );

        res.status( 200 ).json( suggestedUsers );
    }
    catch( error ){
        console.log( "Error in the getSuggestedUser controller: ", error.message );
        res.status( 500 ).json( { error: error.message } );
    }
};

export const checkUsernameAvailability = async ( req, res ) => {
    const { username } = req.body;
    const userId = req.user._id;

    try{
        const existingUser = await User.findOne( { username,  _id: { $ne : userId }  } );
        if( existingUser ){
            //send UI alert
            return res.status( 400 ).json( { available: false } );
        }
        else{
            return res.status( 200 ).json( { available: true } );
        };

    }
    catch( error ){
        console.log( "Error in checkUsernameAvailability route: ", error.message );
        res.status( 500 ).json( { error: error.message } );
    };
};

export const updateUser = async ( req, res ) => {
    const { username, currentPassword, newPassword, email, fullname, bio, link } = req.body;
    let { profileImg, coverImg } = req.body;
    const userId = req.user._id;

    try{ 
        const user = await User.findById( userId );
        if( !user ){
            return res.status( 404 ).json( { message: "User not found" } );
        };

        if( ( !currentPassword && newPassword ) || ( currentPassword && !newPassword ) ){
            return res.status( 400 ).json( { error: "Please provide both the passwords." } );
        };

        if( currentPassword && newPassword ){
            if( currentPassword === newPassword ){
                return res.status( 400 ).json( { error: "Current and new password can't be the same." } );
            };
            const isMatch = await bcrypt.compare( currentPassword, user.password );
            if( !isMatch ){ return res.status( 400 ).json( { error: "Incorrect password." } ); };
            if( newPassword.length < 6 ){ return res.status( 400 ).json( { error: "Password must be at least 6 characters long." } ) };

            const salt = await bcrypt.genSalt( 10 );
            user.password = await bcrypt.hash( newPassword, salt );
        };

        if( email && email !== user.email ){
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            if( !emailRegex.test( email.trim() ) ){
                return res.status( 400 ).json( { error: "Invalid email" } );
            };

            const emailExists = await User.findOne( { email, _id: { $ne : user._id } } );
            if( emailExists ){
                return res.status( 400 ).json( { error: "Email already exists" } );
            };
        };

        if( username && username !== user.username ){
            const isTaken = await User.findOne( { username, _id: { $ne: user._id } } );
            if( isTaken ){
                return res.status( 400 ).json( { error: "Username not available" } );
            };            
        };
        
        if( profileImg ){ // UPDATE IMAGES WITH CLOUDINARY 👇🏾
            if( user.profileImg ){
                await cloudinary.uploader.destroy( user.profileImg.split( "/" ).pop().split( "." )[0] );
            };
            const cloudinaryResponse = await cloudinary.uploader.upload( profileImg );
            profileImg = cloudinaryResponse.secure_url;
         };
        if( coverImg ){ 
            if( user.coverImg ){
                await cloudinary.uploader.destroy( user.coverImg.split( "/" ).pop().split( "." )[0] );
            };
            const cloudinaryResponse = await cloudinary.uploader.upload( coverImg );
            coverImg = cloudinaryResponse.secure_url;
         };
        
         user.fullname = fullname || user.fullname;
         user.email = email || user.email;
         user.username = username || user.username;
         if( bio !== undefined ){
            user.bio = bio;
         };
         if( link !== undefined ){
            user.link = link;
         };
         user.profileImg = profileImg || user.profileImg;
         user.coverImg = coverImg || user.coverImg;

         const updatedUser = await user.save();
         updatedUser.password = null;
         res.status( 200 ).json( { updatedUser} );
     }
    catch( error ){
        console.log( "Error in the updateUser route: ", error.message );
        res.status( 500 ).json( { error: error.message } );
    };
};