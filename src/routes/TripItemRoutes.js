import express from "express";
import authenticateUser from "../middleware/authMiddleware.js"; // ✅ ADD THIS
import { addTripPlace, addTripActivity, addTripCulinary } from "../controllers/TripItemsController.js";

const router = express.Router();

router.post("/places", authenticateUser, addTripPlace);
router.post("/activities", authenticateUser, addTripActivity);
router.post("/culinary", authenticateUser, addTripCulinary);

export default router;