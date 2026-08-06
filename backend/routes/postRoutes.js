import express from "express";
import { createPost, deletePost, commentOnPost, likeUnlikePost, getAllPosts, getLikedPosts, getFollowingPosts, getUserPosts } from "../controllers/postController.js";
import { protectRoutes } from "../middlewares/protectRoutes.js";

const router = express.Router();
router.get( "/all", protectRoutes, getAllPosts );
router.get( "/following", protectRoutes, getFollowingPosts );
router.get( "/likes/:id", protectRoutes, getLikedPosts );
router.get( "/user/:username", protectRoutes, getUserPosts );
router.post( "/create", protectRoutes, createPost );
router.post( "/like/:id", protectRoutes, likeUnlikePost );
router.post( "/comment/:id", protectRoutes, commentOnPost );
router.delete( "/:id", protectRoutes, deletePost );

export default router;