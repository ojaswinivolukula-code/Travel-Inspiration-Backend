import supabase from "../config/supabaseClient.js";

export const isAdmin = async (req, res, next) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({ message: "User ID required" });
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", userId)
      .single();

    if (error) throw error;

    if (data.role !== "admin") {
      return res.status(403).json({ message: "Admin access only" });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
