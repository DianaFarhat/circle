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
        fats: meal.fats,
      },
    });

    await mealPlan.save();
    res.status(201).json(mealPlan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// controllers/mealPlanController.js
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
    const { userId } = req.params;
    const { start, end } = req.query;

    const startDate = moment(start).startOf('day').toDate();
    const endDate = moment(end).endOf('day').toDate();

    const mealPlans = await MealPlan.find({
      user: userId,
      start: { $gte: startDate, $lte: endDate },
    }).populate('meal');

    res.status(200).json(mealPlans);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
