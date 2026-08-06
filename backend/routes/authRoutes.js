import express from "express";
import { signup, login, logout, getMe } from "../controllers/authController.js";
import { protectRoutes } from "../middlewares/protectRoutes.js";

const router = express.Router();

router.get( "/me", protectRoutes, getMe );

router.post( "/signup", signup );

router.post( "/login", login );

router.post( "/logout", logout );


export default router;