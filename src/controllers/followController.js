import supabase from "../config/supabaseClient.js";

export const followUser = async (req, res, next) => {
  try {
    const follower_id = req.user.id;
    const { following_id } = req.body;

    if (follower_id === following_id) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    const { data, error } = await supabase
      .from("follows")
      .insert([{ follower_id, following_id }])
      .select();

    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

export const unfollowUser = async (req, res, next) => {
  try {
    const follower_id = req.user.id;
    const { following_id } = req.body;

    const { error } = await supabase
      .from("follows")
      .delete()
      .eq("follower_id", follower_id)
      .eq("following_id", following_id);

    if (error) throw error;
    res.json({ message: "Unfollowed successfully" });
  } catch (error) {
    next(error);
  }
};
