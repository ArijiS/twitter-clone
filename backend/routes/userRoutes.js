import express from "express";
import { protectRoutes } from "../middlewares/protectRoutes.js";
import { getUserProfile, followUnfollowUser, getSuggestedUsers, updateUser, checkUsernameAvailability } from "../controllers/userController.js";

const router = express.Router();

router.get( "/profile/:username", protectRoutes, getUserProfile );
router.get( "/checkusernameavailability", protectRoutes, checkUsernameAvailability );
router.get( "/suggested", protectRoutes, getSuggestedUsers );
router.post( "/follow/:id", protectRoutes, followUnfollowUser );
router.post( "/update", protectRoutes, updateUser );


export default router;