const express = require("express");
const Router = express.Router();

const authMiddleware = require("../middleware/auth");
const itemController = require("../controllers/item");

Router.route("/")
  .post(authMiddleware, itemController.createItem)
  .get(authMiddleware, itemController.getAllItems);

Router.route("/:idItem")
  .get(authMiddleware, itemController.getItem)
  .put(authMiddleware, itemController.updateItem)
  .delete(authMiddleware, itemController.deleteItem);

module.exports = Router;
