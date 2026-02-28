import * as Review from "../models/reviewModel.js";

export const createReview = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const { destination_id, rating, comment } = req.body;

    if (!destination_id || !rating) {
      return res.status(400).json({
        error: "Destination ID and rating are required",
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        error: "Rating must be between 1 and 5",
      });
    }

    const { data, error } = await Review.createReview({
      user_id,
      destination_id,
      rating,
      comment: comment || null,
    });

    if (error) throw error;

    res.status(201).json({
      message: "Review created successfully",
      data: data[0],
    });
  } catch (error) {
    next(error);
  }
};

export const getReviewsByDestination = async (req, res, next) => {
  try {
    const { destinationId } = req.params;

    const { data, error } = await Review.getReviewsByDestination(destinationId);

    if (error) throw error;

    res.json({
      count: data.length,
      reviews: data,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserReviews = async (req, res, next) => {
  try {
    const user_id = req.user.id;

    const { data, error } = await Review.getUserReviews(user_id);

    if (error) throw error;

    res.json({
      count: data.length,
      reviews: data,
    });
  } catch (error) {
    next(error);
  }
};

// Update a review
export const updateReview = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    // Validation
    if (!rating) {
      return res.status(400).json({
        error: "Rating is required",
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        error: "Rating must be between 1 and 5",
      });
    }

    // Check if review exists and belongs to user
    const { data: existingReview, error: fetchError } =
      await Review.getReviewById(reviewId);

    if (fetchError) throw fetchError;

    if (!existingReview) {
      return res.status(404).json({
        error: "Review not found",
      });
    }

    if (existingReview.user_id !== user_id) {
      return res.status(403).json({
        error: "You can only edit your own reviews",
      });
    }

    // Update the review
    const { data, error } = await Review.updateReview(reviewId, {
      rating,
      comment: comment || null,
      updated_at: new Date().toISOString(),
    });

    if (error) throw error;

    res.json({
      message: "Review updated successfully",
      data: data[0],
    });
  } catch (error) {
    next(error);
  }
};

// Delete a review
export const deleteReview = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const { reviewId } = req.params;

    // Check if review exists and belongs to user
    const { data: existingReview, error: fetchError } =
      await Review.getReviewById(reviewId);

    if (fetchError) throw fetchError;

    if (!existingReview) {
      return res.status(404).json({
        error: "Review not found",
      });
    }

    if (existingReview.user_id !== user_id) {
      return res.status(403).json({
        error: "You can only delete your own reviews",
      });
    }

    // Delete the review
    const { error } = await Review.deleteReview(reviewId);

    if (error) throw error;

    res.json({
      message: "Review deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
