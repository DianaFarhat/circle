const express = require("express");
const router = express.Router();
const {
  getUserMealPlan,
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

// GET /user/:userId
// With optional query parameters for filtering by date range
router.get('/userMealPlan', authenticate, getUserMealPlan);


module.exports = router;
