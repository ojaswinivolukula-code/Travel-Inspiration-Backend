import express from "express";
import supabase from "../config/supabaseClient.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, name, email, avatar_url")
      .neq("id", req.user.id) // exclude self
      .eq("role", "user"); // exclude admins

    if (error) return res.status(400).json({ message: error.message });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
