import express from "express";
import {
  createJournal,
  getUserJournals,
  getJournalById,
  updateJournal,
  deleteJournal,
} from "../controllers/journalController.js";

const router = express.Router();

router.post("/", createJournal);
router.get("/", getUserJournals);
router.get("/:id", getJournalById);
router.put("/:id", updateJournal);
router.delete("/:id", deleteJournal);

export default router;