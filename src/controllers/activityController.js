import * as Activity from "../models/activityModel.js";

export const getAllActivities = async (req, res, next) => {
  try {
    const { data, error } = await Activity.getAllActivities();
    if (error) throw error;
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const getActivitiesByDestination = async (req, res, next) => {
  try {
    const { destinationId } = req.params;
    const { data, error } = await Activity.getActivitiesByDestination(destinationId);
    if (error) throw error;
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const createActivity = async (req, res, next) => {
  try {
    const { data, error } = await Activity.createActivity(req.body);
    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

export const updateActivity = async (req, res, next) => {
  try {
    const { data, error } = await Activity.updateActivity(req.params.id, req.body);
    if (error) throw error;
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const deleteActivity = async (req, res, next) => {
  try {
    const { error } = await Activity.deleteActivity(req.params.id);
    if (error) throw error;
    res.json({ message: "Activity deleted" });
  } catch (error) {
    next(error);
  }
};