import  supabase  from "../config/supabaseClient.js";

export const getAllDestinations = () => {
  return supabase.from("destinations").select("*");
};

export const getDestinationById = (id) => {
  return supabase.from("destinations").select("*").eq("id", id).single();
};

export const createDestination = (destination) => {
  return supabase.from("destinations").insert([destination]).select();
};

export const updateDestination = (id, destination) => {
  return supabase
    .from("destinations")
    .update(destination)
    .eq("id", id)
    .select();
};

export const deleteDestination = (id) => {
  return supabase.from("destinations").delete().eq("id", id);
};