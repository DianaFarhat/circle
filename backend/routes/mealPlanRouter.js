const express = require("express");
const router = express.Router();
const {
  getMealHistory,
  getMealsByDate,
  addMealToPlan,
  deleteMealFromPlan,
  updateCalorieLimit
} = require("../controllers/mealPlanController");
const { authenticate } = require("../middleware/authMiddleware");

// Get full meal history (all past plans)
router.get("/history", authenticate, getMealHistory);

// Get meals for a specific date
router.get("/:date", authenticate, getMealsByDate);

// Add a meal to a meal plan for a specific date
router.post("/:date/add", authenticate, addMealToPlan);

// Delete a meal from a specific date
router.delete("/:date/remove/:mealId", authenticate, deleteMealFromPlan);

// Update calorie limit for a meal plan
router.put("/update-limit", authenticate, updateCalorieLimit);

module.exports = router;
