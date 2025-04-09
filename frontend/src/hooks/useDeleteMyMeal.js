// hooks/useDeleteMyMeal.js
import { useDeleteMealMutation } from '../services/mealApi';
import { toast } from 'react-toastify'; // optional toast feedback

const useDeleteMyMeal = () => {
  const [deleteMeal, { isLoading, error }] = useDeleteMealMutation();

  const onDelete = async (meal) => {
    try {
      await deleteMeal(meal._id).unwrap();
      console.log('Meal deleted!');
  
      // Show toast very briefly then dismiss
      const id = toast.success(`Deleted "${meal.name}"`);
      setTimeout(() => {
        toast.dismiss(id);
        window.location.reload(); // reload the page to reflect deletion
      }, 100); // toast shows briefly before reload
    } catch (err) {
      console.error('Delete failed:', err);
      toast.error('Failed to delete meal');
    }
  };
  

  return { onDelete, isLoading, error };
};

export default useDeleteMyMeal;
