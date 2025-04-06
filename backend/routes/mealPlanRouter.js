const express = require("express");
const router = express.Router();
const {
  getMealHistory,
  getMealsByDate,
  addMealToPlan,
  removeMealFromPlan,
  updateCalorieLimit
} = require("../controllers/mealPlanController");
const { authenticate } = require("../middlewares/authMiddleware");

//Add meal to user plan
router.post('/addMealToPlan', addMealToPlan);


//Remove meal to user plan
router.post('/removeMealFromPlan/:mealId', removeMealFromPlan);

module.exports = router;
