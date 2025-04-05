const express = require("express");
const router = express.Router();
const {
  getMealHistory,
  getMealsByDate,
  addMealToPlan,
  deleteMealFromPlan,
  updateCalorieLimit
} = require("../controllers/mealPlanController");
const { authenticate } = require("../middlewares/authMiddleware");

//Add meal to user plan
router.post('/', addMealToPlan);


module.exports = router;
