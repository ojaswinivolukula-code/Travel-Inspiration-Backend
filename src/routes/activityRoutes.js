import express from "express";
import {
  getActivitiesByDestination,
  createActivity,
  deleteActivity
} from "../controllers/activityController.js";

import authenticateUser from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/destination/:destinationId", getActivitiesByDestination);

router.post("/", authenticateUser, isAdmin, createActivity);

router.delete("/:id", authenticateUser, isAdmin, deleteActivity);

export default router;