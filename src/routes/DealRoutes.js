import express from "express";
import {
  getAllDeals,
  getDealById,
  createDeal,
  updateDeal,
  deleteDeal,
} from "../controllers/DealController.js";
import authenticateUser from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", getAllDeals);
router.get("/:id", getDealById);
router.post("/", authenticateUser, isAdmin, createDeal);
router.put("/:id", authenticateUser, isAdmin, updateDeal);
router.delete("/:id", authenticateUser, isAdmin, deleteDeal);

export default router;
