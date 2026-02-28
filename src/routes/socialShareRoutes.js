import express from "express";
import supabase from "../config/supabaseClient.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  const { post_id, platform } = req.body;
  const { data, error } = await supabase
    .from("social_shares")
    .insert([{ post_id, user_id: req.user.id, platform }]);

  if (error) return res.status(400).json({ message: error.message });
  res.status(201).json({ message: "Share logged" });
});

export default router;
