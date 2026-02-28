import express from "express";
import { followUser, unfollowUser } from "../controllers/followController.js";

import authenticateUser from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authenticateUser, followUser);

router.delete("/", authenticateUser, unfollowUser);

export default router;
