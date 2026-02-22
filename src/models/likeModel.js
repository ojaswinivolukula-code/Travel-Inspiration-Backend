import { supabase } from "../config/supabaseClient.js";

export const likePost = async (like) => {
  return await supabase
    .from("likes")
    .insert([like])
    .select();
};

export const unlikePost = async (user_id, post_id) => {
  return await supabase
    .from("likes")
    .delete()
    .eq("user_id", user_id)
    .eq("post_id", post_id);
};