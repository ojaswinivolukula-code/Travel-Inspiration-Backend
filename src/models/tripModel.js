import { supabase } from "../config/supabaseClient.js";

export const createTrip = async (trip) => {
  return await supabase
    .from("trips")
    .insert([trip])
    .select();
};

export const getUserTrips = async (user_id) => {
  return await supabase
    .from("trips")
    .select("*")
    .eq("user_id", user_id);
};