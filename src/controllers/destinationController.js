import * as Destination from "../models/destinationModel.js";

export const getDestinations = async (req, res, next) => {
  try {
    const filters = req.query;

    const { data, error } = await Destination.getAllDestinations(filters);

    if (error) throw error;

    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const getDestination = async (req, res, next) => {
  try {
    const { data, error } = await Destination.getDestinationById(req.params.id);

    if (error) throw error;

    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const createDestination = async (req, res, next) => {
  try {
    const { data, error } = await Destination.createDestination(req.body);

    if (error) throw error;

    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

export const updateDestination = async (req, res, next) => {
  try {
    const { data, error } = await Destination.updateDestination(
      req.params.id,
      req.body
    );

    if (error) throw error;

    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const deleteDestination = async (req, res, next) => {
  try {
    const { error } = await Destination.deleteDestination(req.params.id);

    if (error) throw error;

    res.json({ message: "Destination deleted" });
  } catch (error) {
    next(error);
  }
};