// models/Tag.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tagSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    isPublic: { type: Boolean, default: false },  // Tag visibility
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },  // Tag creator
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tag", tagSchema);
