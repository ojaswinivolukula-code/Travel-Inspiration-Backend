import * as Activity from "../models/activityModel.js";
import  supabase  from "../config/supabaseClient.js";

export const getActivitiesByDestination = async (req, res, next) => {
  try {
    const { destinationId } = req.params;

    const { data, error } =
      await Activity.getActivitiesByDestination(destinationId);

    if (error) throw error;

    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const createActivity = async (req, res, next) => {
  try {
    const activityData = {
      ...req.body,
      
    };

    const { data, error } = await Activity.createActivity(activityData);

    if (error) throw error;

    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

export const deleteActivity = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { error } = await Activity.deleteActivity(id);

    if (error) throw error;

    res.json({ message: "Activity deleted successfully" });
  } catch (error) {
    next(error);
  }
};