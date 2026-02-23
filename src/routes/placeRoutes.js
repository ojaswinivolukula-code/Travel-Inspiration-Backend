import express from "express";
import {
  getPlaces,
  createPlace,
  deletePlace
} from "../controllers/placeController.js";

import { isAdmin } from "../middleware/adminMiddleware.js";
import authenticateUser from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/", getPlaces);

router.post("/", authenticateUser, isAdmin,createPlace);

router.delete("/:id",authenticateUser, isAdmin, deletePlace);

export default router;