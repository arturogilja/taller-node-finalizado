const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, "Missing description"]
  },
  isDone: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Item", ItemSchema);
