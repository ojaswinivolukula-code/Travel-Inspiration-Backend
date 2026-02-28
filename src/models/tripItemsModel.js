import supabase from "../config/supabaseClient.js";

export const addTripPlace = async (trip_id, place_id) => {
  return await supabase
    .from("trip_places")
    .insert([{ trip_id, place_id }])
    .select();
};

export const addTripActivity = async (trip_id, activity_id) => {
  return await supabase
    .from("trip_activities")
    .insert([{ trip_id, activity_id }])
    .select();
};

export const addTripCulinary = async (trip_id, culinary_id) => {
  return await supabase
    .from("trip_culinary")
    .insert([{ trip_id, culinary_id }])
    .select();
};
