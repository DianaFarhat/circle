const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Tag Schema
const tagSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, unique: true, index: true }, // index for faster searches
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tag", tagSchema);
