import supabase from "../config/supabaseClient.js";

export const createTrip = async (trip) => {
  return await supabase.from("trips").insert([trip]).select();
};

export const getUserTrips = async (user_id) => {
  return await supabase.from("trips").select("*").eq("user_id", user_id);
};

export const getTripById = async (id, user_id) => {
  return await supabase
    .from("trips")
    .select("*")
    .eq("id", id)
    .eq("user_id", user_id)
    .single();
};

// ✅ FIXED - now fetches places, activities & culinary
export const getTripDetails = async (id) => {
  const { data: trip, error: tripError } = await supabase
    .from("trips")
    .select("*")
    .eq("id", id)
    .single();

  if (tripError) return { error: tripError };

  const { data: places } = await supabase
    .from("trip_places")
    .select("*, places(*)")
    .eq("trip_id", id);

  const { data: activities } = await supabase
    .from("trip_activities")
    .select("*, activities(*)")
    .eq("trip_id", id);

  const { data: culinary } = await supabase
    .from("trip_culinary")
    .select("*, culinary(*)")
    .eq("trip_id", id);

  return {
    data: {
      trip,
      places: places || [],
      activities: activities || [],
      culinary: culinary || [],
    },
  };
};

export const updateTripStatus = async (id, user_id, status) => {
  return await supabase
    .from("trips")
    .update({ status })
    .eq("id", id)
    .eq("user_id", user_id)
    .select();
};

export const deleteTrip = async (id, user_id) => {
  return await supabase
    .from("trips")
    .delete()
    .eq("id", id)
    .eq("user_id", user_id);
};
