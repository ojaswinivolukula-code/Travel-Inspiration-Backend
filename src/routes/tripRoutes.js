import authenticateUser from "../middleware/authMiddleware.js";
import {
  createTrip,
  getUserTrips,
  deleteTrip,
  getTripById,
  getTripDetails,
  updateTripStatus,
      
} from "../controllers/tripController.js";
import router from "./TripItemRoutes.js";

// existing routes...
router.post("/", authenticateUser, createTrip);
router.get("/my", authenticateUser, getUserTrips);
router.get("/:id/details", authenticateUser, getTripDetails);
router.get("/:id", authenticateUser, getTripById);
router.patch("/:id/status", authenticateUser, updateTripStatus);
router.delete("/:id", authenticateUser, deleteTrip);
 export default router