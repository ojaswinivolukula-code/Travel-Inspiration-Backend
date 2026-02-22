import * as Review from "../models/reviewModel.js";

export const createReview = async (req, res, next) => {
  try {
    const user_id = req.user.id;

    const { destination_id, rating, comment } = req.body;

    const { data, error } = await Review.createReview({
      user_id,
      destination_id,
      rating,
      comment
    });

    if (error) throw error;

    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

export const getReviewsByDestination = async (req, res, next) => {
  try {
    const { destinationId } = req.params;

    const { data, error } = await Review.getReviewsByDestination(destinationId);

    if (error) throw error;

    res.json(data);
  } catch (error) {
    next(error);
  }
};