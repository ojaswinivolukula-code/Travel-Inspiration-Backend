import express from "express";
import {
  getPlaces,
  createPlace,
  deletePlace
} from "../controllers/placeController.js";

import { isAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", getPlaces);

router.post("/", isAdmin, createPlace);

router.delete("/:id", isAdmin, deletePlace);

export default router;