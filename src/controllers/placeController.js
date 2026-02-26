import * as Place from "../models/placeModel.js";

export const getAllPlaces = async (req, res, next) => {
  try {
    const { data, error } = await Place.getPlaces();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    next(error);
  }
};
export const getPlacesByDestination = async (req, res, next) => {
  try {
    const { destinationId } = req.params;

    const { data, error } = await Place.getPlacesByDestination(destinationId);

    if (error) throw error;

    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const createPlace = async (req, res, next) => {
  try {
    const { data, error } = await Place.createPlace(req.body);

    if (error) throw error;

    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

export const deletePlace = async (req, res, next) => {
  try {
    const { error } = await Place.deletePlace(req.params.id);

    if (error) throw error;

    res.json({ message: "Place deleted" });
  } catch (error) {
    next(error);
  }
};