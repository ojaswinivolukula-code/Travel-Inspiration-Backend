import * as Deal from "../models/DealModel.js";

export const getAllDeals = async (req, res, next) => {
  try {
    const { type, destination_id } = req.query;
    const { data, error } = await Deal.getAllDeals({ type, destination_id });
    if (error) throw error;
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const getDealById = async (req, res, next) => {
  try {
    const { data, error } = await Deal.getDealById(req.params.id);
    if (error) throw error;
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const createDeal = async (req, res, next) => {
  try {
    const { data, error } = await Deal.createDeal(req.body);
    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

export const updateDeal = async (req, res, next) => {
  try {
    const { data, error } = await Deal.updateDeal(req.params.id, req.body);
    if (error) throw error;
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const deleteDeal = async (req, res, next) => {
  try {
    const { error } = await Deal.deleteDeal(req.params.id);
    if (error) throw error;
    res.json({ message: "Deal deleted" });
  } catch (error) {
    next(error);
  }
};
