import supabase from "../config/supabaseClient.js";

export const getAllDeals = async (filters = {}) => {
  let query = supabase
    .from("deals")
    .select("*, destinations(name, country, image_url)")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (filters.type) query = query.eq("type", filters.type);
  if (filters.destination_id)
    query = query.eq("destination_id", filters.destination_id);

  return await query;
};

export const getDealById = async (id) => {
  return await supabase
    .from("deals")
    .select("*, destinations(name, country, image_url)")
    .eq("id", id)
    .single();
};

export const createDeal = async (deal) => {
  return await supabase.from("deals").insert([deal]).select();
};

export const updateDeal = async (id, data) => {
  return await supabase.from("deals").update(data).eq("id", id).select();
};

export const deleteDeal = async (id) => {
  return await supabase.from("deals").delete().eq("id", id);
};
