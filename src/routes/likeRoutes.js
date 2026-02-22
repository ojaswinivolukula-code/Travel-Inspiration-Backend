import express from "express";
import  authenticateUser  from "../middleware/authMiddleware.js";
import {
  likePost,
  unlikePost
} from "../controllers/likeController.js";

const router = express.Router();

router.post("/", authenticateUser, likePost);
router.delete("/", authenticateUser, unlikePost);

export default router;