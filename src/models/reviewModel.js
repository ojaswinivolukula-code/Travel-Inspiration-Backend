import supabase from "../config/supabaseClient.js";

export const createReview = async (review) => {
  return await supabase.from("reviews").insert([review]).select();
};

export const getReviewsByDestination = async (destination_id) => {
  return await supabase
    .from("reviews")
    .select("*")
    .eq("destination_id", destination_id)
    .order("created_at", { ascending: false });
};

export const getUserReviews = async (user_id) => {
  return await supabase
    .from("reviews")
    .select("*")
    .eq("user_id", user_id)
    .order("created_at", { ascending: false });
};

export const getReviewById = async (review_id) => {
  return await supabase
    .from("reviews")
    .select("*")
    .eq("id", review_id)
    .single();
};

export const updateReview = async (review_id, updates) => {
  return await supabase
    .from("reviews")
    .update(updates)
    .eq("id", review_id)
    .select();
};

export const deleteReview = async (review_id) => {
  return await supabase.from("reviews").delete().eq("id", review_id);
};
