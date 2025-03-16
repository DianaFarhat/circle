const mongoose = require("mongoose");

const mealPlanSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    meals: [
      {
        meal: { type: mongoose.Schema.Types.ObjectId, ref: "Meal", required: true },
        portion: { type: Number, required: true, min: 0.1 }, // Portion multiplier (e.g., 1.5x)
      }
    ],
    totalCalories: { type: Number, default: 0 },
    calorieLimit: { type: Number, required: true }, // User-defined daily calorie limit
  },
  { timestamps: true }
);

module.exports = mongoose.model("MealPlan", mealPlanSchema);
