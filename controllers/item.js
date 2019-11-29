const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const Item = require("../models/Item");

// POST {Private}
// /item
// description, isDone?
exports.createItem = asyncHandler(async (req, res) => {
  const { description, isDone } = req.body;
  const item = await Item.create({
    description,
    isDone,
    user: req.user.id
  });
  return res.json({
    success: true,
    item
  });
});

// GET {Private}
// /item
exports.getAllItems = asyncHandler(async (req, res) => {
  const items = await Item.find({
    user: req.user._id
  });

  return res.json({
    success: true,
    items
  });
});

// GET {Private}
// /item/:idItem
exports.getItem = asyncHandler(async (req, res) => {
  const id = req.params.idItem;
  const item = await Item.findById(id);
  if (!item) throw new ErrorResponse("Resource not found", 404);
  if (!item.user === req.user._id)
    throw new ErrorResponse("Resource not found", 404);

  return res.json({
    success: true,
    item
  });
});

// PUT {Private}
// /item/:idItem
// isDone?, description?
exports.updateItem = asyncHandler(async (req, res) => {
  const id = req.params.idItem;

  let item = await Item.findById(id);
  if (!item) {
    throw new ErrorResponse("Resource not found", 404);
  }

  if (!item.user === req.user._id)
    throw new ErrorResponse("Resource not found", 404);

  item = await Item.findOneAndUpdate(id, req.body, {
    new: true,
    runValidators: true
  });

  return res.json({
    success: true,
    item
  });
});

// DELETE {Private}
// /item/:idItem
exports.deleteItem = asyncHandler(async (req, res) => {
  const id = req.params.idItem;

  let item = await Item.findById(id);
  if (!item) {
    throw new ErrorResponse("Resource not found", 404);
  }

  if (!item.user === req.user._id)
    throw new ErrorResponse("Resource not found", 404);

  await Item.findOneAndDelete(id);

  return res.json({
    success: true
  });
});
