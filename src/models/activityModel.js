import supabase from "../config/supabaseClient.js";

export const getAllActivities = async () => {
  return await supabase.from("activities").select("*");
};

export const getActivitiesByDestination = async (destinationId) => {
  return await supabase
    .from("activities")
    .select("*")
    .eq("destination_id", destinationId);
};

export const createActivity = async (activity) => {
  return await supabase.from("activities").insert([activity]).select();
};

export const updateActivity = async (id, data) => {
  return await supabase.from("activities").update(data).eq("id", id).select();
};

export const deleteActivity = async (id) => {
  return await supabase.from("activities").delete().eq("id", id);
};
