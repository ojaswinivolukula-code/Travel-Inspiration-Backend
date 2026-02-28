import supabase from "../config/supabaseClient.js";

export const getDashboardStats = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const { count: tripsCount } = await supabase
      .from("trips")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    const { count: journalCount } = await supabase
      .from("journals")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    const { count: postCount } = await supabase
      .from("posts")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    const { count: followersCount } = await supabase
      .from("follows")
      .select("*", { count: "exact", head: true })
      .eq("following_id", userId);

    const { count: reviewsCount } = await supabase
      .from("reviews")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    res.json({
      totalTrips: tripsCount || 0,
      totalJournals: journalCount || 0,
      totalPosts: postCount || 0,
      followers: followersCount || 0,
      totalReviews: reviewsCount || 0,
    });
  } catch (error) {
    next(error);
  }
};
