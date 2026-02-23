import  supabase  from "../config/supabaseClient.js";

export const createPost = async (post) => {
  return await supabase
    .from("posts")
    .insert([post])
    .select();
};

export const getPosts = async () => {
  return await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });
};

export const deletePost = async (id) => {
  return await supabase
    .from("posts")
    .delete()
    .eq("id", id);
};