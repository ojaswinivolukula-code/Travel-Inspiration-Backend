import * as Comment from "../models/commentModel.js";

export const createComment = async (req, res, next) => {
  try {
    const { post_id, comment } = req.body;

    const user_id = req.user.id;

    const { data, error } = await Comment.createComment({
      post_id,
      user_id,
      comment,
    });

    if (error) throw error;

    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

export const getCommentsByPost = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const { data, error } = await Comment.getCommentsByPost(postId);

    if (error) throw error;

    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { error } = await Comment.deleteComment(id);

    if (error) throw error;

    res.json({ message: "Comment deleted" });
  } catch (error) {
    next(error);
  }
};
