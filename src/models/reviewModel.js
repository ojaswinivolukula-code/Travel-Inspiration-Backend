import { supabase } from "../config/supabaseClient.js";

export const createReview = async (review) => {
  return await supabase
    .from("reviews")
    .insert([review])
    .select();
};

export const getReviewsByDestination = async (destination_id) => {
  return await supabase
    .from("reviews")
    .select("*")
    .eq("destination_id", destination_id);
};