import express from "express";
import {
  getCulinaryByDestination,
  createCulinary,
  deleteCulinary
} from "../controllers/culinaryController.js";

import authenticateUser from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/:id", getCulinaryByDestination);
router.post("/", authenticateUser, isAdmin, createCulinary);
router.delete("/:id", authenticateUser, isAdmin, deleteCulinary);

export default router;