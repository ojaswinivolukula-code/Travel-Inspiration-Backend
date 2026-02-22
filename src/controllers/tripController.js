import * as Trip from "../models/tripModel.js";

export const createTrip = async (req, res, next) => {
  try {
    const user_id = req.user.id;

    const {
      start_date,
      end_date,
      number_of_days,
      notes,
      total_budget
    } = req.body;

    const { data, error } = await Trip.createTrip({
      user_id,
      start_date,
      end_date,
      number_of_days,
      notes,
      total_budget
    });

    if (error) throw error;

    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

export const getUserTrips = async (req, res, next) => {
  try {
    const user_id = req.user.id;

    const { data, error } = await Trip.getUserTrips(user_id);

    if (error) throw error;

    res.json(data);
  } catch (error) {
    next(error);
  }
};