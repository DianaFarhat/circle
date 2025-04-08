// hooks/useDeleteMyMeal.js
import { useDeleteMealMutation } from '../services/mealApi';
import { toast } from 'react-toastify'; // optional toast feedback

const useDeleteMyMeal = () => {
  const [deleteMeal, { isLoading, error }] = useDeleteMealMutation();

  const onDelete = async (meal) => {
    const confirmed = window.confirm(`Are you sure you want to delete "${meal.name}"?`);
    if (!confirmed) return;

    try {
      await deleteMeal(meal._id).unwrap();
      console.log('Meal deleted!');
      toast.success(`Deleted "${meal.name}"`); // Optional feedback
    } catch (err) {
      console.error('Delete failed:', err);
      toast.error('Failed to delete meal'); // Optional feedback
    }
  };

  return { onDelete, isLoading, error };
};

export default useDeleteMyMeal;
