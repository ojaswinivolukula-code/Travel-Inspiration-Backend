import express from "express";
import {
  getDestinations,
  getDestination,
  createDestination,
  updateDestination,
  deleteDestination
} from "../controllers/destinationController.js";

import { isAdmin } from "../middleware/adminMiddleware.js";
import authenticateUser from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/", getDestinations);
router.get("/:id", getDestination);

router.post("/", authenticateUser, isAdmin, createDestination);
router.put("/:id",authenticateUser, isAdmin, updateDestination);
router.delete("/:id", authenticateUser,isAdmin, deleteDestination);

export default router;