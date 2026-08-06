import Notification from "../models/notificationModel.js";
import User from "../models/userModel.js";



export const getAllNotifications = async ( req, res ) => {
    const userId = req.user._id;
    try{
        const allNotifications = await Notification.find( { to: userId } ).populate( {
            path: "from",
            select: "username profileImg",
        } );
        await Notification.updateMany( { to: userId }, { $set: { read: true } } );
        res.status( 200 ).json( allNotifications );
    }
    catch( error ){
        console.log( "Error in  getAllNotification controller: ", error.message );
        res.status( 500 ).json( { error: error.message } );
    };
};

export const deleteNotifications = async ( req, res ) => {
    const userId = req.user._id;
    try{
        await Notification.deleteMany( { to: userId } );
        res.status( 200 ).json( { message: "Notifications deleted successfully" } );
    }
    catch( error ){
        console.log( "Error in the deleteNotification controller: ", error.message );
        res.status( 500 ).json( { error: error.message } );
    };
};

export const deleteOneNotification = async ( req, res ) => {
    const notificationId = req.params.id;
    const userId = req.user._id;
    try{
        const notification = await Notification.findById( notificationId );
        if( !notification ){
            return res.status( 404 ).json( { error: "Notification not found" } );
        }
        if( !notification.to.equals( userId ) ){
            return res.status( 403 ).json( { error: "You are not allowed to perform this operation" } );
        };
        await Notification.findByIdAndDelete( notificationId );
        res.status( 200 ).json( { message: "Notification deleted successfully" } );
    }
    catch( error ){
        console.log( "Error in the deleteOneNotification controller: ", error.message );
        res.status( 500 ).json( { error: error.message } );
    };
};