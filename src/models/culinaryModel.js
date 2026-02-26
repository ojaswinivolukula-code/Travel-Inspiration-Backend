import supabase from "../config/supabaseClient.js";

export const getCulinaryByDestination = async (destinationId) => {
  return await supabase
    .from("culinary")
    .select("*")
    .eq("destination_id", destinationId);
};

export const createCulinary = async (culinaryData) => {
  return await supabase
    .from("culinary")
    .insert([culinaryData])
    .select();
};

export const deleteCulinary = async (id) => {
  return await supabase
    .from("culinary")
    .delete()
    .eq("id", id);
};