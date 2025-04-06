// controllers/mealPlanController.js
const MealPlan= require('../models/mealPlan.js');
const Meal = require('../models/mealModel.js');

const moment= require('moment');

exports.addMealToPlan = async (req, res) => {
  try {
    const { userId, mealId, start, end } = req.body;

    // Fetch meal to get nutrient info
    const meal = await Meal.findById(mealId);
    if (!meal) return res.status(404).json({ message: 'Meal not found' });

    const mealPlan = new MealPlan({
      user: userId,
      meal: mealId,
      start,
      end,
      nutrients: {
        calories: meal.calories,
        protein: meal.protein,
        carbs: meal.carbs,
        fats:(meal.saturatedFats || 0) + (meal.unsaturatedFats || 0),
      },
    });

    await mealPlan.save();
    res.status(201).json(mealPlan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.removeMealFromPlan = async (req, res) => {
    try {
      //1. Get Meal Id from Request Params
      const { mealId} = req.params;
      
      //2. Make sure id exists in mongoDB
      const mealPlan = await MealPlan.findById(mealId);
      if (!mealPlan) {
        return res.status(404).json({ message: 'Meal plan entry not found' });
      }
  
      const deleted = await MealPlan.findByIdAndDelete(mealId);

      if (!deleted) {
        return res.status(404).json({ message: 'Error deleting meal plan' });
      }
  
      res.status(200).json({ message: 'Meal plan entry deleted' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
};
  

exports.getUserMealPlan = async (req, res) => {
  try {
    const { userId } = req.user._id;
    let { startDate, endDate } = req.query;

    const today = new Date();

    // Default range: current week (Sunday to Saturday)
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // Sunday
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 7); // next Sunday (exclusive)
    endOfWeek.setHours(0, 0, 0, 0);

    // Parse incoming dates or fallback to default
    startDate = startDate ? new Date(startDate) : startOfWeek;
    endDate = endDate ? new Date(endDate) : endOfWeek;

    // Enforce max planning window (1 year ahead only)
    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

    if (endDate > oneYearFromNow) {
      return res.status(400).json({ message: 'Cannot fetch meal plans more than 1 year in advance' });
    }

    // Query meal plans within the selected range
    const meals = await MealPlan.find({
      user: userId,
      start: { $gte: startDate, $lt: endDate }
    }).populate('meal');

    res.status(200).json(meals);
  } catch (err) {
    console.error('Error fetching meal plan:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
