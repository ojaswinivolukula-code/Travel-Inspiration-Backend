import express from "express";
import {
  getAllCulinary,
  getCulinaryByDestination,
  createCulinary,
  updateCulinary,
  deleteCulinary,
} from "../controllers/culinaryController.js";
import authenticateUser from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/destination/:destinationId", getCulinaryByDestination);

router.get("/", getAllCulinary);
router.post("/", authenticateUser, isAdmin, createCulinary);
router.put("/:id", authenticateUser, isAdmin, updateCulinary);
router.delete("/:id", authenticateUser, isAdmin, deleteCulinary);

export default router;
