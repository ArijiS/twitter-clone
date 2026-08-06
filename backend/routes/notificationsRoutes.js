import express from "express";
import { protectRoutes } from "../middlewares/protectRoutes.js";
import { getAllNotifications, deleteNotifications, deleteOneNotification } from "../controllers/notificationController.js";

const router = express.Router();

router.get( "/", protectRoutes, getAllNotifications );
router.delete( "/", protectRoutes, deleteNotifications );
router.delete( "/:id", protectRoutes, deleteOneNotification );

export default router;