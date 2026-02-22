import express from "express";
import {
  createPost,
  getPosts,
  deletePost
} from "../controllers/postController.js";

import authenticateUser from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getPosts);

router.post("/", authenticateUser, createPost);

router.delete("/:id", authenticateUser, deletePost);

export default router;