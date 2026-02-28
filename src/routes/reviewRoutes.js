import express from "express";
import {
  createReview,
  getReviewsByDestination,
  updateReview,
  deleteReview,
  getUserReviews
} from "../controllers/reviewController.js";

import authenticateUser from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authenticateUser, createReview);
router.get("/destination/:destinationId", getReviewsByDestination);
router.get("/user/my-reviews", authenticateUser, getUserReviews);
router.put("/:reviewId", authenticateUser, updateReview);
router.delete("/:reviewId", authenticateUser, deleteReview);

export default router;