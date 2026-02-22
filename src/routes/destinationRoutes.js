import express from "express";
import {
  getDestinations,
  getDestination,
  createDestination,
  updateDestination,
  deleteDestination
} from "../controllers/destinationController.js";

import { isAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", getDestinations);
router.get("/:id", getDestination);

router.post("/", isAdmin, createDestination);
router.put("/:id", isAdmin, updateDestination);
router.delete("/:id", isAdmin, deleteDestination);

export default router;