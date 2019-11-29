const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  // Loggear para debuggear
  console.log(err);

  // Recurso no encontrado
  if (err.name === "CastError") {
    const message = `Resource not found`;
    error = new ErrorResponse(message, 404);
  }

  // Mongoose llave duplicada
  if (err.code === 11000) {
    const message = "Duplicated value in unique field";
    error = new ErrorResponse(message, 400);
  }

  //  Mongoose Error de validacion
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map(val => val.message);
    console.log(message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error"
  });
};

module.exports = errorHandler;
