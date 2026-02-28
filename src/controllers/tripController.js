import * as Trip from "../models/tripModel.js";

export const createTrip = async (req, res, next) => {
  try {
    const user_id = req.user.id;

    const {
      destination_id,
      name,
      status,
      start_date,
      end_date,
      number_of_days,
      notes,
      total_budget,
    } = req.body;

    const { data, error } = await Trip.createTrip({
      user_id,
      destination_id,
      name,
      status: status || "planned",
      start_date,
      end_date,
      number_of_days,
      notes,
      total_budget,
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
export const getTripById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;

    const { data, error } = await Trip.getTripById(id, user_id);

    if (error) throw error;

    res.json(data);
  } catch (error) {
    next(error);
  }
};
export const getTripDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Trip.getTripDetails(id);
    if (result.error) throw result.error;
    res.json({
      trip: result.data.trip,
      places: result.data.places,
      activities: result.data.activities,
      culinary: result.data.culinary,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTripStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;
    const { status } = req.body;

    const { data, error } = await Trip.updateTripStatus(id, user_id, status);

    if (error) throw error;

    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const deleteTrip = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;
    const { error } = await Trip.deleteTrip(id, user_id);
    res.status(200).json({ message: "Trip deleted" });
  } catch (error) {
    next(error);
  }
};
