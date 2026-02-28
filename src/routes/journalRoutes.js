import express from "express";
import {
  createJournal,
  getUserJournals,
  getJournalById,
  updateJournal,
  deleteJournal,
  getAllJournals,
} from "../controllers/journalController.js";
import authenticateUser from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/all", getAllJournals); // public journals for community tab

router.post("/", authenticateUser, createJournal);
router.get("/", authenticateUser, getUserJournals);
router.get("/:id", authenticateUser, getJournalById);
router.put("/:id", authenticateUser, updateJournal);
router.delete("/:id", authenticateUser, deleteJournal);

export default router;
