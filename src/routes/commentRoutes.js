import express from "express";
import {
  createComment,
  getCommentsByPost,
  deleteComment
} from "../controllers/commentController.js";

import authenticateUser from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/post/:postId", getCommentsByPost);

router.post("/", authenticateUser, createComment);

router.delete("/:id", authenticateUser, deleteComment);

export default router;