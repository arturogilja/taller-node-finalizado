const express = require("express");
const Router = express.Router();

const authController = require("../controllers/auth");
const authMiddleware = require("../middleware/auth");

Router.post("/register", authController.register);
Router.post("/login", authController.login);
Router.get("/me", authMiddleware, authController.me);

module.exports = Router;
