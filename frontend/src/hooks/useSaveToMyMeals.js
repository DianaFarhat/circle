// hooks/useSaveToMyMeals.js
import { useSaveMealAsCopyMutation } from '../services/mealApi';

const useSaveToMyMeals = () => {
  const [saveMealAsCopy, { isLoading, error }] = useSaveMealAsCopyMutation();

  const saveMeal = async (meal) => {
    try {
      await saveMealAsCopy({ mealId: meal._id, mealData: meal }).unwrap();
      console.log('Meal saved successfully!');
    } catch (err) {
      console.error('Failed to save meal:', err);
      throw err;
    }
  };

  return { saveMeal, isLoading, error };
};

export default useSaveToMyMeals;
