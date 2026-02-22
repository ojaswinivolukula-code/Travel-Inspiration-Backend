export const successResponse = (res, data, message = "Success") => {
  res.json({
    success: true,
    message,
    data
  });
};

export const errorResponse = (res, message = "Error") => {
  res.status(400).json({
    success: false,
    message
  });
};