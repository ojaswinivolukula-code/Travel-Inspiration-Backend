import express from "express";
import {
  createReview,
  getReviewsByDestination
} from "../controllers/reviewController.js";

import authenticateUser from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authenticateUser, createReview);

router.get("/destination/:destinationId", getReviewsByDestination);

export default router;