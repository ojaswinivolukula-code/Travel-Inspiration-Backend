import supabase from "../config/supabaseClient.js";

export const createComment = async (comment) => {
  return await supabase
    .from("post_comments")
    .insert([comment])
    .select("*, profiles(name, avatar_url)");
};

export const getCommentsByPost = async (post_id) => {
  return await supabase
    .from("post_comments")
    .select("*, profiles(name, avatar_url)")
    .eq("post_id", post_id)
    .order("created_at", { ascending: true });
};

export const deleteComment = async (id) => {
  return await supabase.from("post_comments").delete().eq("id", id);
};
