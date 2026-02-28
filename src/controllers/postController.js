import * as Post from "../models/postModel.js";

export const createPost = async (req, res, next) => {
  try {
    const { title, content, image_url, trip_id, journal_id, visibility } =
      req.body;

    const user_id = req.user.id;

    const { data, error } = await Post.createPost({
      user_id,
      title,
      content,
      image_url,
      trip_id,
      journal_id,
      visibility,
    });

    if (error) throw error;

    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

export const getPosts = async (req, res, next) => {
  try {
    const { data, error } = await Post.getPosts();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { error } = await Post.deletePost(id);

    if (error) throw error;

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    next(error);
  }
};
