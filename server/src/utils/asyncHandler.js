const asyncHandler = (requestHandler) => async (req, res, next) => {
  try {
    await requestHandler(req, res, next);
  } catch (error) {
    // Ensure status code is set to 500 if it's not defined
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
      success: false,
      status: statusCode,
      message: error.message,
    });
  }
};

export { asyncHandler };
