import express from "express";
import {
  getAllActivities,
  getActivitiesByDestination,
  createActivity,
  updateActivity,
  deleteActivity,
} from "../controllers/activityController.js";
import authenticateUser from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/destination/:destinationId", getActivitiesByDestination);

router.get("/", getAllActivities);
router.post("/", authenticateUser, isAdmin, createActivity);
router.put("/:id", authenticateUser, isAdmin, updateActivity);
router.delete("/:id", authenticateUser, isAdmin, deleteActivity);

export default router;
