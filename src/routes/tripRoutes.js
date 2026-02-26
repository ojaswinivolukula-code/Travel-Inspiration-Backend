import express from "express";
import {
  createTrip,
  getUserTrips,
  deleteTrip,
  getTripById,
  getTripDetails, // ✅ ADD THIS
} from "../controllers/tripController.js";

import authenticateUser from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authenticateUser, createTrip);
router.get("/my", authenticateUser, getUserTrips);
router.get("/:id/details", authenticateUser, getTripDetails); // ✅ BEFORE /:id
router.get("/:id", authenticateUser, getTripById);            // ✅ AFTER /details
router.delete("/:id", authenticateUser, deleteTrip);          // ✅ FIXED

export default router;