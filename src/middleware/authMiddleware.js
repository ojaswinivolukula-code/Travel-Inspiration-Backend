import supabase from "../config/supabaseClient.js";

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const { data, error } = await supabase.auth.getUser(token);
    if (error) throw error;

    // ✅ Fetch role from profiles table
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();

    req.user = { ...data.user, role: profile?.role || "user" };
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default authenticateUser;
