import { supabase } from "../config/supabaseClient.js";

// Get all places
export const getPlaces = async () => {
  return await supabase
    .from("places")
    .select("*");
};

// Get places by destination
export const getPlacesByDestination = async (destinationId) => {
  return await supabase
    .from("places")
    .select("*")
    .eq("destination_id", destinationId);
};

// Get single place
export const getPlaceById = async (id) => {
  return await supabase
    .from("places")
    .select("*")
    .eq("id", id)
    .single();
};

// Create place (Admin)
export const createPlace = async (placeData) => {
  return await supabase
    .from("places")
    .insert([placeData])
    .select();
};

// Update place (Admin)
export const updatePlace = async (id, placeData) => {
  return await supabase
    .from("places")
    .update(placeData)
    .eq("id", id)
    .select();
};

// Delete place (Admin)
export const deletePlace = async (id) => {
  return await supabase
    .from("places")
    .delete()
    .eq("id", id);
};