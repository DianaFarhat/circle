// controllers/mealPlanController.js
import MealPlan from '../models/mealPlan.js';
import Meal from '../models/Meal.js';

import moment from 'moment';
export const addMealToPlan = async (req, res) => {
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
export const removeMealFromPlan = async (req, res) => {
    try {
      const { id } = req.params;
  
      const mealPlan = await MealPlan.findById(id);
      if (!mealPlan) {
        return res.status(404).json({ message: 'Meal plan entry not found' });
      }
  
      await mealPlan.remove();
      res.status(200).json({ message: 'Meal plan entry deleted' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
};
  

export const getUserMealPlan = async (req, res) => {
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
