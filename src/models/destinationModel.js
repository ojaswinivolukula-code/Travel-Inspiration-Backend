import supabase from "../config/supabaseClient.js";

export const getAllDestinations = (filters = {}) => {
  let query = supabase.from("destinations").select("*");

  if (filters.category) {
    query = query.eq("category", filters.category);
  }

  if (filters.climate) {
    query = query.eq("climate", filters.climate);
  }

  if (filters.best_season) {
    query = query.eq("best_season", filters.best_season);
  }

  if (filters.country) {
    query = query.ilike("country", `%${filters.country}%`);
  }

  if (filters.search) {
    query = query.or(
      `name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`,
    );
  }

  return query;
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
