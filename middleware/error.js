import { ErrorResponse } from "../utils/errorResponse.js";
export const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  //console.log(err);
  error.message = err.message;
  if (err.code === 11000) {
    const message = "Dupicate Field Value Enter";
    error = new ErrorResponse(message, 400);
  }
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }
  res
    .status(error.statusCode || 500)
    .send({ success: false, error: error.message || "Server Error" });
};
