const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");

// POST {Public}
// /auth/register
// name, email, password
exports.register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password
  });
  return res.json({
    success: true
  });
});

// POST {Public}
// /auth/login
// email, password
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // Validate emil & password
  if (!email || !password) {
    throw new ErrorResponse("Please provide an email and password", 400);
  }

  const user = await User.findOne({
    email
  }).select("+password");
  if (!user) throw new ErrorResponse("Invalid credentials", 401);

  const passwordMatched = await user.matchPassword(password);
  if (!passwordMatched) throw new ErrorResponse("Invalid credentials", 401);

  const token = user.getSignedToken();
  return res.json({
    success: true,
    token
  });
});

// GET {Private}
// /auth/me
exports.me = asyncHandler(async (req, res) => {
  return res.json(req.user);
});
