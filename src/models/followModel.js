import supabase from "../config/supabaseClient.js";

export const followUser = async (follow) => {
  return await supabase.from("follows").insert([follow]).select();
};

export const unfollowUser = async (follower_id, following_id) => {
  return await supabase
    .from("follows")
    .delete()
    .eq("follower_id", follower_id)
    .eq("following_id", following_id);
};
