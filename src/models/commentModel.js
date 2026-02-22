import { supabase } from "../config/supabaseClient.js";

export const createComment = async (comment) => {
  return await supabase
    .from("comments")
    .insert([comment])
    .select();
};

export const getCommentsByPost = async (post_id) => {
  return await supabase
    .from("comments")
    .select("*")
    .eq("post_id", post_id);
};

export const deleteComment = async (id) => {
  return await supabase
    .from("comments")
    .delete()
    .eq("id", id);
};