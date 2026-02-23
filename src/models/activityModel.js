import  supabase  from "../config/supabaseClient.js";

export const getActivitiesByDestination = async (destinationId) => {
  return await supabase
    .from("activities")
    .select("*")
    .eq("destination_id", destinationId);
};


export const createActivity = async (activity) => {
  return await supabase
    .from("activities")
    .insert([activity])
    .select();
};

export const deleteActivity = async (id) => {
  return await supabase
    .from("activities")
    .delete()
    .eq("id", id);
};