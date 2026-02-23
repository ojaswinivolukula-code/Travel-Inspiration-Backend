import  supabase  from "../config/supabaseClient.js";

export const likePost = async (req, res, next) => {
  try {
    const { post_id } = req.body;

    const { data, error } = await supabase
      .from("post_likes")
      .insert([
        {
          post_id,
          user_id: req.user.id
        }
      ])
      .select();

    if (error) throw error;

    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

export const unlikePost = async (req, res, next) => {
  try {
    const { post_id } = req.body;

    const { error } = await supabase
      .from("post_likes")
      .delete()
      .eq("post_id", post_id)
      .eq("user_id", req.user.id);

    if (error) throw error;

    res.json({ message: "Post unliked" });
  } catch (error) {
    next(error);
  }
};