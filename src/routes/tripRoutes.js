import express from "express";
import {
  createTrip,
  getUserTrips
} from "../controllers/tripController.js";

import authenticateUser from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authenticateUser, createTrip);

router.get("/my", authenticateUser, getUserTrips);

export default router;