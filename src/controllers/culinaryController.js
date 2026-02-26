import * as Culinary from "../models/culinaryModel.js";

export const getCulinaryByDestination = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data, error } = await Culinary.getCulinaryByDestination(id);
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

export const deleteCulinary = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error } = await Culinary.deleteCulinary(id);
    if (error) throw error;
    res.json({ message: "Culinary item deleted successfully" });
  } catch (error) {
    next(error);
  }
};