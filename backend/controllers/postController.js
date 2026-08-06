import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import Notification from "../models/notificationModel.js";
import { v2 as cloudinary } from "cloudinary";


export const createPost = async ( req, res ) => {
    try{
        const { text } = req.body;
        let { img } = req.body;
        const userId = req.user._id;
        const user = await User.findById( userId );
        if( !user ){
            return res.status( 404 ).json( { error: "User not found" } );
        };
        if( !text && !img ){
            return res.status( 400 ).json( { error: "Nothing to post" } );
        };
        if( img ){
            const uploadResponse = await cloudinary.uploader.upload( img );
            img = uploadResponse.secure_url;
        }
        const newPost = new Post( {
            user : userId, 
            img : img,
            text: text,
        } );
        await newPost.save();
        res.status( 200 ).json( newPost );
    }
    catch( error ){
        console.log( "Error in createPost controller" );
        res.status( 500 ).json( { error: error.message } );
    }
};

export const deletePost = async ( req, res ) => {
    try{
        const post = await Post.findById( req.params.id );
        if( !post ){
            return res.status( 404 ).json( { error: "Post not found" } );
        };
        if( !post.user.equals( req.user._id ) ){
            return res.status( 400 ).json( { error: "Not authorized to delete post" } ); 
        };
        if( post.img ){
            const imgId = post.img.split( "/" ).pop().split( "." )[0];
            await cloudinary.uploader.destroy( imgId );
        };
        await Post.findByIdAndDelete( req.params.id );
        res.status( 200 ).json( { message: "Post deleted successfully" } );
    }
    catch( error ){
        console.log( "Error in the deletePost controller: ", error.message );
        res.status( 500 ).json( { error: error.message } );
    };
};

export const commentOnPost = async ( req, res ) => {
    try{
        const { text } = req.body;
        if( !text ){
            return res.status( 404 ).json( { error: "No comment passed" } );
        };
        const post = await Post.findById( req.params.id );
        if( !post ){
            return res.status( 404 ).json( { error: "Post not found" } );
        };
        const comment = { text, user: req.user._id };
        post.comments.push( comment );
        await post.save();
        res.status( 200 ).json( post );

    }
    catch( error ){
        console.log( "Error in the commentOnPost controller", error.message );
        res.status( 400 ).json( { error: error.message } );
    };
};

export const likeUnlikePost = async ( req, res ) => {
    try{
        const post = await Post.findById( req.params.id );
        if( !post ){
            return res.status( 404 ).json( { error: "No post found" } );
        };
        const user = req.user;
        const userLikedPost = post.likes.some( id => id.equals( user._id ) );
        if( userLikedPost ){
            post.likes.pull( user._id );
            user.likedPosts.pull( post._id );
            await Promise.all( [ post.save(), user.save() ] );
            res.status( 200 ).json( { message: "Post unliked" } );
        }
        else{
            post.likes.push( user._id );
            user.likedPosts.push( post._id );

            if( !user._id.equals( post.user ) ){
                const newNotification = new Notification( {
                from: user._id,
                to: post.user,
                type: "like"
            } );
            await Promise.all( [ post.save(), user.save(), newNotification.save() ] );
            }
            else{
                await Promise.all( [ post.save(), user.save() ] );
            };
            return res.status( 200 ).json( { message: "Post liked" } );
        }
    }
    catch( error ){
        console.log( "Error in likeUnlikePost controller: ", error.message );
        res.status( 500 ).json( { error: error.message } );
    };
};

export const getAllPosts = async ( req, res ) => {
    try{
        const posts = await Post.find().sort( { createdAt: -1 } )
        .populate( {
            path: "user",
            select: "-password",
        } ).populate( {
            path: "comments.user",
            select: "-password"
        } );
        if( posts.length === 0 ){
            return res.status( 200 ).json( [] );
        };
        res.status( 200 ).json( posts );

    }
    catch( error ){
        console.log( "Error in getAllPost controller: ", error.message );
        res.status( 500 ).json( { error: error.message } );
    };
};

export const getLikedPosts = async ( req, res ) => {
    const userId = req.params.id;
    try{
        const user = await User.findById( userId );
        if( !user ){
            return res.status( 404 ).json( { error: "No user found" } );
        };
        const likedPosts = await Post.find( { _id: { $in: user.likedPosts } } ).
        populate( { 
            path: "user",
            select: "-password",
         } ).
         populate( {
            path: "comments.user",
            select: "-password",
         } );
         res.status( 200 ).json( likedPosts );
    }
    catch( error ){
        console.log( "Error in getLikedPosts controller: ", error.message );
        res.status( 500 ).json( { Error : error.message } );
    };
};

export const getFollowingPosts = async ( req, res ) => {
    const userId = req.user._id;
    try{
        const user = await User.findById( userId );
        if( !user ){
            return res.status( 404 ).json( { error: "User not found" } );
        };
        const followingPosts = await Post.find( { user: { $in: user.following } } ).sort( { createdAt: -1 } ).populate( {
            path: "user",
            select: "-password",
        } ).populate( {
            path: "comments.user",
            select: "-password",
        } );
        res.status( 200 ).json( followingPosts );
    }
    catch( error ){
        console.log( "Error in the getFollowingPosts controller: ", error.message );
        res.status( 500 ).json( { error: error.message } );
    };
};

export const getUserPosts = async ( req, res ) => {
    const userName = req.params.username;
    try{
        const user = await User.findOne( { userName } ).select( "-password" );
        if( !user ){
            console.log( "User not found" );
            return res.status( 404 ).json( { error: "User not found" } );
        };
        const userPosts = await (await Post.find( { user : user._id } )).sort( {
            createdAt: -1
        } ).populate( {
            path: "user",
            select: "-password"
        } ).populate( {
            path: "comments.user",
            select: "-password"
        } );

        res.status( 200 ).json( { userPosts } );

    }
    catch( error ){
        console.log( "Error in getUserPosts controller: ", error.message );
        res.status( 500 ).json( { error: error.message } );
    };
};