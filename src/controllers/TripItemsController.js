import * as TripItems from "../models/tripItemsModel.js";

export const addTripPlace = async (req, res, next) => {
  try {
    const { trip_id, place_id } = req.body;
    const { data, error } = await TripItems.addTripPlace(trip_id, place_id);
    if (error) throw error;
    res.status(201).json(data);
  } catch (error) { next(error); }
};

export const addTripActivity = async (req, res, next) => {
  try {
    const { trip_id, activity_id } = req.body;
    const { data, error } = await TripItems.addTripActivity(trip_id, activity_id);
    if (error) throw error;
    res.status(201).json(data);
  } catch (error) { next(error); }
};

export const addTripCulinary = async (req, res, next) => {
  try {
    const { trip_id, culinary_id } = req.body;
    const { data, error } = await TripItems.addTripCulinary(trip_id, culinary_id);
    if (error) throw error;
    res.status(201).json(data);
  } catch (error) { next(error); }
};