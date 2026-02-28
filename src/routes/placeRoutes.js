import express from "express";
import {
  getAllPlaces,
  getPlacesByDestination,
  createPlace,
  updatePlace,
  deletePlace,
} from "../controllers/placeController.js";
import { isAdmin } from "../middleware/adminMiddleware.js";
import authenticateUser from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/destination/:destinationId", getPlacesByDestination);

router.get("/", getAllPlaces);
router.post("/", authenticateUser, isAdmin, createPlace);
router.put("/:id", authenticateUser, isAdmin, updatePlace);
router.delete("/:id", authenticateUser, isAdmin, deletePlace);

export default router;
