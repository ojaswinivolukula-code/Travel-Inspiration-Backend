import * as Follow from "../models/followModel.js";

export const followUser = async (req, res, next) => {
  try {
    const follower_id = req.user.id;
    const { following_id } = req.body;

    const { data, error } = await Follow.followUser({
      follower_id,
      following_id
    });

    if (error) throw error;

    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

export const unfollowUser = async (req, res, next) => {
  try {
    const follower_id = req.user.id;
    const { following_id } = req.body;

    const { error } = await Follow.unfollowUser(follower_id, following_id);

    if (error) throw error;

    res.json({ message: "Unfollowed successfully" });
  } catch (error) {
    next(error);
  }
};