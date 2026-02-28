import * as Culinary from "../models/culinaryModel.js";

export const getAllCulinary = async (req, res, next) => {
  try {
    const { data, error } = await Culinary.getAllCulinary();
    if (error) throw error;
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const getCulinaryByDestination = async (req, res, next) => {
  try {
    const { destinationId } = req.params;
    const { data, error } =
      await Culinary.getCulinaryByDestination(destinationId);
    if (error) throw error;
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const createCulinary = async (req, res, next) => {
  try {
    const { data, error } = await Culinary.createCulinary(req.body);
    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

export const updateCulinary = async (req, res, next) => {
  try {
    const { data, error } = await Culinary.updateCulinary(
      req.params.id,
      req.body,
    );
    if (error) throw error;
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const deleteCulinary = async (req, res, next) => {
  try {
    const { error } = await Culinary.deleteCulinary(req.params.id);
    if (error) throw error;
    res.json({ message: "Culinary deleted" });
  } catch (error) {
    next(error);
  }
};
