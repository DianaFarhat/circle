const mongoose = require("mongoose");

const mealPlanSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  meal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Meal',
    required: true,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  // Optionally store nutrients separately for quicker access
  nutrients: {
    calories: { type: Number, default: 0 },
    protein: { type: Number, default: 0 },
    carbs: { type: Number, default: 0 },
    fats: { type: Number, default: 0 },
  },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MealPlan", mealPlanSchema);
