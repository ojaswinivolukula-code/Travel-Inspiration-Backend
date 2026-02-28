import supabase from "../config/supabaseClient.js";

export const createJournal = async (journal) => {
  return await supabase.from("journals").insert([journal]).select();
};

export const getUserJournals = async (user_id) => {
  return await supabase.from("journals").select("*").eq("user_id", user_id);
};
