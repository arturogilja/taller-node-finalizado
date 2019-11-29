const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");

module.exports = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization) {
    token = req.headers.authorization;
  }

  // Verificar que el token exista en el campo authorization
  if (!token) {
    throw new ErrorResponse("Not authorized", 401);
  }

  try {
    // Verificar token y decodificar payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    throw new ErrorResponse("Not authorized", 401);
  }
});
